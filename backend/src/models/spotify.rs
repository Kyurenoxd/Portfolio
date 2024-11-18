use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SpotifyTrack {
    pub cover: String,
    pub title: String,
    pub artist: String,
    pub duration: i32,
    pub progress: i32,
    pub dominant_color: String,
    pub is_playing: bool,
}

#[derive(Debug, Deserialize)]
pub struct SpotifyTokenResponse {
    pub access_token: String,
}

#[derive(Debug, Deserialize)]
pub struct SpotifyCurrentlyPlaying {
    pub is_playing: bool,
    pub item: Option<SpotifyItem>,
    pub progress_ms: Option<i32>,
}

#[derive(Debug, Deserialize)]
pub struct SpotifyItem {
    pub name: String,
    pub artists: Vec<SpotifyArtist>,
    pub duration_ms: i32,
    pub album: SpotifyAlbum,
}

#[derive(Debug, Deserialize)]
pub struct SpotifyArtist {
    pub name: String,
}

#[derive(Debug, Deserialize)]
pub struct SpotifyAlbum {
    pub images: Vec<SpotifyImage>,
}

#[derive(Debug, Deserialize)]
pub struct SpotifyImage {
    pub url: String,
} 