"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWeatherData = void 0;
const fetchWeatherData = async (query = "") => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const weatherData = [
        {
            "city": "New York",
            "temperature": 25,
            "humidity": 70
        },
        {
            "city": "London",
            "temperature": 18,
            "humidity": 80
        },
        {
            "city": "Tokyo",
            "temperature": 30,
            "humidity": 60
        },
        {
            "city": "Paris",
            "temperature": 22,
            "humidity": 75
        },
        {
            "city": "Sydney",
            "temperature": 28,
            "humidity": 65
        },
    ];
    return weatherData;
};
exports.fetchWeatherData = fetchWeatherData;
