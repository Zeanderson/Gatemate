import express from "express";
import homeRouter from "./controllers/weather";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./controllers/userController";
import { connect } from "./datasources/db";

//TODO Needs to be in ENV file
const PORT = 4001;

const app = express();

//Connecting to the database once and reusing the connection
connect();

// Middleware goes here -- IF it does not go above routes it will not work ;)
app.use(express.json());

//TODO app.use('/api/v1/login', loginController);
//TODO app.use('/api/v1/signup', signupController);
app.use("/api/v1/home", homeRouter);
app.use("/api/v1/user", userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
