import { IDailyWeather, IWeatherData, IUser } from "../interfaces";
import { DailyWeather, WeatherData, User } from "../models";
import { Router } from "express";
import * as argon2 from "argon2";

const userRouter = Router();

/*

  * User routes
    
*/

declare module "express-session" {
  interface Session {
    user?: IUser;
  }
}

userRouter.get("/session", async (req, res) => {
  if (req.session.user) {
    res.send({ user: req.session.user.email, status: "200" });
  } else {
    res.send({ status: "404" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user: IUser = req.body;
    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      const verified = await verifyPassword(user, existingUser.password);

      if (verified) {
        req.session.user = {
          email: existingUser.email,
          password: existingUser.password,
          fields: existingUser.fields,
        };
        res.send({ message: "Login successful", status: "200" });
      } else {
        res.send({ message: "Login failed", status: "404" });
      }
    } else {
      res.send({ message: "User not found", status: "404" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const user: IUser = req.body;
    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      res.send({ message: "User already exists", status: "400" });
    } else {
      const hashedPassword = await hashPassword(user);

      await User.create({
        email: user.email,
        password: hashedPassword,
      });

      res.send({ message: "User Created", status: "201" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

userRouter.get("/logout", async (req, res) => {
  if (req.session.user === undefined) {
    res.send({ message: "No user logged in", status: "200" });
    return;
  }
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error" });
    } else {
      res.send({ message: "User logged out", status: "200" });
    }
  });
});

/*

    * Password hashing helper functions
*/

// Use when creating a new user
let hashPassword = async (user: IUser): Promise<string> => {
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
  user: IUser,
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
