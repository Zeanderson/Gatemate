import { Router } from "express";
import getWeather from "../datasources/weatherData";
import { weatherData } from "../types";
const homeRouter = Router();

homeRouter.get("/weather", async (req, res) => {
  const area = req.query.input;
  if (area === undefined || typeof area !== "string") {
    return res.send("Please enter an area");
  }
  const weatherData = await getWeather(area);
  if (weatherData === undefined) {
    return res.send("Weather data not available");
  }

  //We are now returning cleaned weather data to the client
  res.send(weatherData.daily);
});

export default homeRouter;
