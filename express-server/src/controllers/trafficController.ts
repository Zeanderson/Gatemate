import { Router } from "express";
import getTraffic from "../datasources/traffic";
import { User } from "../models";
const trafficRouter = Router();

trafficRouter.get("/gen1", async (req, res) => {
  if (!req.session?.user) {
    res.send({ message: "Not logged in" }).status(401);
  } else {
    const email = req.session.user.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      res.send({ message: "User not found" }).status(404);
    } else {
      let numFields = user.fields.length;

      for (let i = 0; i < numFields; i++) {
        await getTraffic(email, user.fields[i].fieldId);
      }
    }
  }
  res.send({ message: "Traffic generated", status: "200" });
});

export default trafficRouter;
