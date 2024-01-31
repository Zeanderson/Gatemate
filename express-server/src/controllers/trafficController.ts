import { Router } from "express";
import getTraffic from "../datasources/traffic";
const trafficRouter = Router();

trafficRouter.get("/gen1", async (req, res) => {
  const trafficData = await getTraffic();
  res.send(trafficData)
});

export default trafficRouter;
