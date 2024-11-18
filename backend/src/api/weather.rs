use actix_web::{get, web, HttpResponse, Scope};
use serde::{Deserialize, Serialize};
use reqwest::{Client, ClientBuilder};
use std::{env, time::Duration};

#[derive(Serialize, Deserialize, Debug)]
pub struct WeatherData {
    temperature: f32,
    condition: String,
    location: String,
}

#[derive(Deserialize, Debug)]
struct OpenWeatherResponse {
    main: MainData,
    weather: Vec<WeatherInfo>,
}

#[derive(Deserialize, Debug)]
struct MainData {
    temp: f32,
}

#[derive(Deserialize, Debug)]
struct WeatherInfo {
    main: String,
}

#[get("/current")]
async fn get_weather() -> HttpResponse {
    log::info!("Starting weather request");

    let api_key = match env::var("OPENWEATHER_API_KEY") {
        Ok(key) => {
            log::info!("API key found");
            key
        },
        Err(e) => {
            log::error!("Failed to get API key: {}", e);
            return HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "API key not found"
            }));
        }
    };
    
    let lat = "54.7065";
    let lon = "20.5109";
    
    // Создаем клиент с настройками
    let client = ClientBuilder::new()
        .timeout(Duration::from_secs(10))
        .connect_timeout(Duration::from_secs(5))
        .build()
        .unwrap_or_else(|_| Client::new());

    let url = format!(
        "https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}&units=metric",
        lat, lon, api_key
    );

    log::info!("Making request to OpenWeather API");

    // Пробуем сделать запрос несколько раз
    for attempt in 1..=3 {
        log::info!("Attempt {} to fetch weather data", attempt);
        
        match client.get(&url).send().await {
            Ok(resp) => {
                let status = resp.status();
                if !status.is_success() {
                    log::error!("OpenWeather API error. Status: {}", status);
                    let error_text = resp.text().await.unwrap_or_else(|_| "No error text".to_string());
                    log::error!("Error response: {}", error_text);
                    
                    if attempt == 3 {
                        return HttpResponse::InternalServerError().json(serde_json::json!({
                            "error": format!("Weather service error: {}", status)
                        }));
                    }
                    continue;
                }

                match resp.json::<OpenWeatherResponse>().await {
                    Ok(weather_data) => {
                        let weather = WeatherData {
                            temperature: weather_data.main.temp,
                            condition: weather_data.weather[0].main.clone(),
                            location: String::from("Kaliningrad"),
                        };
                        log::info!("Weather data fetched successfully: {:?}", weather);
                        return HttpResponse::Ok().json(weather);
                    }
                    Err(e) => {
                        log::error!("Failed to parse weather data: {}", e);
                        if attempt == 3 {
                            return HttpResponse::InternalServerError().json(serde_json::json!({
                                "error": "Failed to parse weather data"
                            }));
                        }
                    }
                }
            }
            Err(e) => {
                log::error!("Failed to send request (attempt {}): {}", attempt, e);
                if attempt == 3 {
                    return HttpResponse::InternalServerError().json(serde_json::json!({
                        "error": "Failed to connect to weather service"
                    }));
                }
            }
        }

        // Ждем немного перед следующей попыткой
        tokio::time::sleep(Duration::from_secs(1)).await;
    }

    HttpResponse::InternalServerError().json(serde_json::json!({
        "error": "Failed to fetch weather data after all attempts"
    }))
}

pub fn config() -> Scope {
    web::scope("/api/weather")
        .service(get_weather)
} 