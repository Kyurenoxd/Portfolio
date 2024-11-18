use actix_cors::Cors;
use actix_web::{middleware, App, HttpServer};
use dotenv::dotenv;
use std::env;

mod api;
mod models;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    env::var("OPENWEATHER_API_KEY").expect("OPENWEATHER_API_KEY must be set");

    log::info!("Starting server at http://localhost:8080");

    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .wrap(middleware::Logger::default())
            .service(api::weather::config())
            .service(api::spotify::config())
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
