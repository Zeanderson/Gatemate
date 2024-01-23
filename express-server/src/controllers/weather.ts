import { Router } from "express";
import { fetchWeatherData } from "../datasources/db";
import { getWeather } from "../datasources/weatherData";

const homeRouter = Router();

homeRouter.get("/weather", async (req, res) => {
  // We can change this back if needed to get our hard-coded data.
  // const weatherData = await fetchWeatherData();

  //Weather for Fayetteville
  const weatherData = await getWeather(36.061932, -94.160583);
  res.send(weatherData);
});

export default homeRouter;
