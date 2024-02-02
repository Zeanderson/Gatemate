import { User } from "../types";
import { Router } from "express";
import * as argon2 from "argon2";
import { readDoc, createDoc } from "../datasources/db";

const userRouter = Router();

/*

  * User routes
    
*/

declare module "express-session" {
  interface Session {
    user?: User;
  }
}

userRouter.post("/login", async (req, res) => {
  if (req.session.user) {
    res.status(200).send({ message: "User already logged in" });
    return;
  }
  const user: User = req.body;

  try {
    const existingUser = await readDoc(
      {
        email: user.email,
        password: user.password,
        collectionName: "User",
      },
      { email: user.email }
    );

    if (existingUser) {
      const verified = await verifyPassword(user, existingUser.password);

      if (verified) {
        req.session.user = {
          email: existingUser.email,
          collectionName: "User",
          password: existingUser.password,
        };
        res.status(200).send({ message: "Login successful" });
      } else {
        res.status(401).send({ message: "Login failed" });
      }
    } else {
      res.status(401).send({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const user: User = req.body;
    const existingUser = await readDoc(
      {
        email: user.email,
        password: user.password,
        collectionName: "User",
      },
      { email: user.email }
    );

    if (existingUser) {
      res.status(400).send({ message: "User already exists" });
    } else {
      const hashedPassword = await hashPassword(user);
      await createDoc({
        ...user,
        password: hashedPassword,
        collectionName: "User",
      });

      res.status(201).send({ message: "User Created" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

/*

    * Password hashing helper functions
*/

// Use when creating a new user
let hashPassword = async (user: User): Promise<string> => {
  try {
    const hashedPassword: string = await argon2.hash(user.password);
    return hashedPassword;
  } catch (err) {
    console.error(err);
    throw new Error("Error hashing password");
  }
};

// Use when trying to login
let verifyPassword = async (
  user: User,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await argon2.verify(hashedPassword, user.password);
  } catch (err) {
    console.error(err);
    throw new Error("Error verifying password");
  }
};

export default userRouter;
