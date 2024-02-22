import { Router, Request, Response } from "express";
import { User, Field } from "../models";

const fieldRouter = Router();

// Create a new field for a specific user
fieldRouter.post("/create", async (req: Request, res: Response) => {
  try {
    if (!req.session?.user) {
      return res.status(403).send("User not logged in");
    }

    const user = await User.findOne({ email: req.session.user.email });
    if (!user) return res.status(404).send("User not found");

    const field = new Field(req.body);
    user.fields.push(field);

    await user.save();
    res.status(201).json(field);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all fields for a specific user
fieldRouter.get("/", async (req: Request, res: Response) => {
  try {
    if (!req.session?.user) {
      return res.status(403).send("User not logged in");
    }

    const user = await User.findOne({ email: req.session.user.email });
    if (!user) return res.status(404).send("User not found");

    res.json(user.fields);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a single field by id
fieldRouter.get("/:fieldId", async (req: Request, res: Response) => {
  try {
    if (!req.session?.user) {
      return res.status(403).send("User not logged in");
    }

    const user = await User.findOne({ email: req.session.user.email });
    if (!user) return res.status(404).send("User not found");

    const field = user.fields.find(
      (field) => field.fieldId === Number(req.params.fieldId)
    );
    if (!field) return res.status(404).send("Field not found");

    res.json(field);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a field by id
fieldRouter.put("/:fieldId", async (req: Request, res: Response) => {
  try {
    if (!req.session?.user) {
      return res.status(403).send("User not logged in");
    }

    const user = await User.findOne({ email: req.session.user.email });
    if (!user) return res.status(404).send("User not found");

    const fieldId = Number(req.params.fieldId);
    const field = user.fields.find((field) => field.fieldId === fieldId);
    if (!field) return res.status(404).send("Field not found");

    Object.assign(field, req.body);
    await user.save();

    res.json(field);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a field by id
fieldRouter.delete("/:fieldId", async (req: Request, res: Response) => {
  try {
    if (!req.session?.user) {
      return res.status(403).send("User not logged in");
    }

    const user = await User.findOne({ email: req.session.user.email });
    if (!user) return res.status(404).send("User not found");

    const fieldId = Number(req.params.fieldId);
    const fieldIndex = user.fields.findIndex(
      (field) => field.fieldId === fieldId
    );
    if (fieldIndex === -1) return res.status(404).send("Field not found");

    user.fields.splice(fieldIndex, 1);
    await user.save();

    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

export default fieldRouter;
