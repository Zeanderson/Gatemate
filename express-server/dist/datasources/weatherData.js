"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeather = void 0;
async function getWeather(lat, lon) {
    var _a, _b;
    const apiKey = (_a = process.env.weather_api_key) !== null && _a !== void 0 ? _a : "";
    const apiUrl = (_b = process.env.weather_api_url) !== null && _b !== void 0 ? _b : "";
    try {
        const response = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        if (!response.ok) {
            console.log(`Bad Response: ${response.status}`);
        }
        const weatherJson = await response.json();
        // Returning daily weather for the next 7 days (including today)
        return weatherJson.daily;
    }
    catch (error) {
        console.error("Error fetching weather data:", error.message);
    }
}
exports.getWeather = getWeather;
