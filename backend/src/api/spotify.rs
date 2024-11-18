use actix_web::{get, web, HttpResponse, Scope};
use reqwest::Client;
use std::env;
use base64::{Engine as _, engine::general_purpose::STANDARD as BASE64};
use crate::models::spotify::*;
use image::GenericImageView;
use palette::{Lab, Srgb, FromColor};

async fn get_spotify_token() -> Result<String, Box<dyn std::error::Error>> {
    let client_id = env::var("SPOTIFY_CLIENT_ID")?;
    let client_secret = env::var("SPOTIFY_CLIENT_SECRET")?;
    let refresh_token = env::var("SPOTIFY_REFRESH_TOKEN")?;
    let auth = BASE64.encode(format!("{}:{}", client_id, client_secret));

    let client = Client::new();
    let response = client
        .post("https://accounts.spotify.com/api/token")
        .header("Authorization", format!("Basic {}", auth))
        .form(&[
            ("grant_type", "refresh_token"),
            ("refresh_token", refresh_token.as_str())
        ])
        .send()
        .await?;

    if !response.status().is_success() {
        let error_text = response.text().await?;
        log::error!("Spotify token error response: {}", error_text);
        return Err("Failed to get Spotify token".into());
    }

    let token_response = response.json::<SpotifyTokenResponse>().await?;
    Ok(token_response.access_token)
}

async fn get_dominant_color(image_url: &str) -> Result<String, Box<dyn std::error::Error>> {
    let client = Client::new();
    let bytes = client.get(image_url).send().await?.bytes().await?;
    let img = image::load_from_memory(&bytes)?;

    let mut colors = Vec::new();
    let (width, height) = img.dimensions();
    let sample_size = 10; // Берем каждый 10-й пиксель для оптимизации

    for x in (0..width).step_by(sample_size) {
        for y in (0..height).step_by(sample_size) {
            let pixel = img.get_pixel(x, y);
            let [r, g, b, _] = pixel.0;
            colors.push(Lab::from_color(Srgb::new(
                r as f32 / 255.0,
                g as f32 / 255.0,
                b as f32 / 255.0,
            )));
        }
    }

    // Находим средний цвет
    let avg_color = colors.iter().fold(Lab::new(0.0, 0.0, 0.0), |acc, &c| {
        Lab::new(
            acc.l + c.l / colors.len() as f32,
            acc.a + c.a / colors.len() as f32,
            acc.b + c.b / colors.len() as f32,
        )
    });

    // Конвертируем обратно в RGB
    let rgb = Srgb::from_color(avg_color);
    let (r, g, b) = (
        (rgb.red * 255.0) as u8,
        (rgb.green * 255.0) as u8,
        (rgb.blue * 255.0) as u8,
    );

    Ok(format!("rgb({}, {}, {})", r, g, b))
}

#[get("/current-track")]
async fn get_current_track() -> HttpResponse {
    let token = match get_spotify_token().await {
        Ok(token) => token,
        Err(e) => {
            log::error!("Failed to get Spotify token: {}", e);
            return HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to authenticate with Spotify"
            }));
        }
    };

    let client = Client::new();
    
    match client
        .get("https://api.spotify.com/v1/me/player/currently-playing")
        .header("Authorization", format!("Bearer {}", token))
        .send()
        .await {
            Ok(response) => {
                if response.status() == 204 {
                    log::info!("No track currently playing");
                    return HttpResponse::Ok().json(serde_json::json!({
                        "is_playing": false
                    }));
                }

                match response.json::<SpotifyCurrentlyPlaying>().await {
                    Ok(playing) => {
                        if let Some(track) = playing.item {
                            let cover_url = track.album.images.first()
                                .map(|img| img.url.clone())
                                .unwrap_or_default();

                            let dominant_color = get_dominant_color(&cover_url)
                                .await
                                .unwrap_or_else(|_| "rgb(99, 102, 241)".to_string());

                            let track_data = SpotifyTrack {
                                cover: cover_url,
                                title: track.name,
                                artist: track.artists.first()
                                    .map(|artist| artist.name.clone())
                                    .unwrap_or_default(),
                                duration: track.duration_ms / 1000,
                                progress: playing.progress_ms.unwrap_or(0) / 1000,
                                dominant_color,
                                is_playing: playing.is_playing,
                            };
                            log::info!("Successfully fetched current track: {:?}", track_data);
                            HttpResponse::Ok().json(track_data)
                        } else {
                            log::info!("No track data in response");
                            HttpResponse::Ok().json(serde_json::json!({
                                "is_playing": false
                            }))
                        }
                    }
                    Err(e) => {
                        log::error!("Failed to parse Spotify response: {}", e);
                        HttpResponse::InternalServerError().json(serde_json::json!({
                            "error": "Failed to parse Spotify data"
                        }))
                    }
                }
            }
            Err(e) => {
                log::error!("Failed to fetch from Spotify API: {}", e);
                HttpResponse::InternalServerError().json(serde_json::json!({
                    "error": "Failed to fetch from Spotify"
                }))
            }
        }
}

pub fn config() -> Scope {
    web::scope("/api/spotify")
        .service(get_current_track)
} 