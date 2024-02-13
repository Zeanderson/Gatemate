import { Router } from "express";
import getTraffic from "../datasources/traffic";
const trafficRouter = Router();

trafficRouter.get("/gen1", async (req, res) => {
  const trafficData = await getTraffic(1, 69); // TODO: Replace 1 and 69 with actual user and field IDs
  res.send(trafficData)
});

export default trafficRouter;
