import { Router } from 'express';
import { fetchWeatherData } from '../datasources/db';

const homeRouter = Router(); 

homeRouter.get('/weather', async(req, res) => {
  const weatherData = await fetchWeatherData();
  res.send(weatherData);
});

export default homeRouter;