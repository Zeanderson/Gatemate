"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../datasources/db");
const homeRouter = (0, express_1.Router)();
homeRouter.get('/weather', async (req, res) => {
    const weatherData = await (0, db_1.fetchWeatherData)();
    res.send(weatherData);
});
exports.default = homeRouter;
