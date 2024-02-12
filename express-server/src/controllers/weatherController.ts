import { Router } from "express";
import getWeather from "../datasources/weatherData";
import { weatherData} from "../interfaces";
const homeRouter = Router();

homeRouter.get("/weather", async (req, res) => {
  const area = req.query.input;
  if (area === undefined || typeof(area) !== "string") {
    return res.send("Please enter an area");
  }
  // Weather for Fayetteville for the next 7 days
  const weatherData : weatherData = await getWeather(area);
  res.send(weatherData);
});

export default homeRouter;
