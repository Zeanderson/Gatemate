import { User } from "../types";
import { Router } from "express";
import * as argon2 from "argon2";
const userRouter = Router();

/*

  * User routes
    
*/

userRouter.post("/login", async (req, res) => {
  const User: User = req.body;
  console.log(User);
  //get hash from database (We don't have db info yet)
  const hash = await argon2.hash(User.password);
  const verified = await verifyPassword(User, hash);
  if (verified) {
    res.status(200).send({ message: "Login successful" });
  } else {
    res.status(401).send({ message: "Login failed" });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const User: User = req.body;
    // Make sure user doesn't already exist
    // const existingUser = await findUser(User.username);
    //if (existingUser)

    const hash = await hashPassword(User);
    // Add user to database
    // await addUserToDatabase({ ...User, password: hash });

    res.status(201).send({ message: "User added to database" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

/*

    * Password hashing helper functions
*/

//Use when creating a new user
let hashPassword = async (User: User): Promise<string> => {
  try {
    const hash: string = await argon2.hash(User.password);
    return hash;
  } catch (err) {
    //Would need to actually handle this error properly (going to send a 500 error or something once database is going)
    console.log(err);
  }
  return "Error";
};

//use when trying to login
let verifyPassword = async (User: User, hash: string): Promise<boolean> => {
  try {
    if (await argon2.verify(hash, User.password)) {
      return true;
    }
  } catch (err) {
    //Would need to actually handle this error properly (going to send a 500 error or something once database is going)
    console.log(err);
  }
  return false;
};

export default userRouter;
