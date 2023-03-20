import express from "express"; // const express = require('express')
import cors from "cors"; //cors allows the rules of communication between the frontend and backend
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { userRouter } from "./routes/usersRoutes.js";

dotenv.config();

const Port = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json()); //this middleware is converting data send from the frontend to JSON format
app.use(cors());

mongoose.connect(process.env.DATABASE_CONNECT);

app.use("/auth", userRouter);

app.listen(Port, () => {
  console.log(`SERVER STARTED ON http://localhost: ${Port}`);
});
