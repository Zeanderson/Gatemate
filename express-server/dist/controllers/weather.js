"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weatherData_1 = require("../datasources/weatherData");
const homeRouter = (0, express_1.Router)();
homeRouter.get("/weather", async (req, res) => {
    // We can change this back if needed to get our hard-coded data.
    // const weatherData = await fetchWeatherData();
    //Weather for Fayetteville
    const weatherData = await (0, weatherData_1.getWeather)(36.061932, -94.160583);
    res.send(weatherData);
});
exports.default = homeRouter;
