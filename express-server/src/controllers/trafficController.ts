import { Router } from "express";
import getTraffic from "../datasources/traffic";
const trafficRouter = Router();

trafficRouter.get("/gen1", async (req, res) => {
  const userId = req.query.userId;
  const fieldId = req.query.fieldId;

  if (userId === undefined || typeof(userId) !== "string" || fieldId === undefined || typeof(fieldId) !== "string"){
    return res.send("Please enter a valid user and field ID");
  }

  const trafficData = await getTraffic(userId, fieldId);
  res.send(trafficData)
});

export default trafficRouter;
