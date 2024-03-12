import { Router, Request, Response } from "express";
import { User, Field, Gate } from "../models";

const gateRouter = Router();

/*
 * Gate Routes
 */

// Create a new gate for a specific field
gateRouter.post("/create/:fieldId", async (req: Request, res: Response) => {
  try {
    if (!req.session?.user) {
      return res.status(403).send("User not logged in");
    }

    const user = await User.findOne({ email: req.session.user.email });
    if (!user) return res.status(404).send("User not found");

    const fieldId = Number(req.params.fieldId);
    const field = user.fields.find((field) => field.fieldId === fieldId);
    if (!field) return res.status(404).send("Field not found");

    const gate = new Gate({
      ...req.body,
      gateId: field.Gates.length + 1, // Auto generate gateId based on the number of existing gates
    });

    field.Gates.push(gate);

    await user.save();
    res.status(201).json(gate);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all gates for a specific field
gateRouter.get("/find/:fieldId", async (req: Request, res: Response) => {
  try {
    if (!req.session?.user) {
      return res.send({ message: "User not logged in", status: "403" })
    }

    const user = await User.findOne({ email: req.session.user.email });
    if (!user) { return res.send({ message: "User not found", status: "404" }) }

    const fieldId = Number(req.params.fieldId);
    const field = user.fields.find((field) => field.fieldId === fieldId);
    if (!field) { return res.send({ message: "Field not found", status: "404" }) }

    res.send({ message: field.Gates, status: "200" })
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a gate by id
gateRouter.put("/:fieldId/:gateId", async (req: Request, res: Response) => {
  try {
    if (!req.session?.user) {
      return res.status(403).send("User not logged in");
    }

    const user = await User.findOne({ email: req.session.user.email });
    if (!user) return res.status(404).send("User not found");

    const fieldId = Number(req.params.fieldId);
    const field = user.fields.find((field) => field.fieldId === fieldId);
    if (!field) return res.status(404).send("Field not found");

    const gateId = Number(req.params.gateId);
    const gate = field.Gates.find((gate) => gate.gateId === gateId);
    if (!gate) return res.status(404).send("Gate not found");

    Object.assign(gate, req.body);
    await user.save();

    res.json(gate);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a gate by id
gateRouter.delete("/:fieldId/:gateId", async (req: Request, res: Response) => {
  try {
    if (!req.session?.user) {
      return res.send({ message: "User not logged in", status: "403" })
    }

    const user = await User.findOne({ email: req.session.user.email });
    if (!user) return res.send({ message: "User not found", status: "404" })

    const fieldId = Number(req.params.fieldId);
    const field = user.fields.find((field) => field.fieldId === fieldId);
    if (!field) return res.send({ message: "Field not found", status: "404" })

    const gateId = Number(req.params.gateId);
    const gateIndex = field.Gates.findIndex((gate) => gate.gateId === gateId);
    if (gateIndex === -1) return res.send({ message: "Gate not found", status: "404" })

    field.Gates.splice(gateIndex, 1);
    await user.save();

    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});
export default gateRouter;
