import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModels.js";

const router = express.Router();

//registration route
router.post("/register", async (req, res) => {
  const { username, password } = req.body; //getting what will be sent from the frontend

  //making request to mongodb database
  /*
  Whenever making request to your database, it will return a promise
  so can either use .then .catch notation or async await
  */
  const user = await userModel.findOne({ username: username }); // checking to see if there's a user in the database or finding a user with username

  //If the user is in the system, then user already exist
  if (user) {
    return res.json({ message: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({ username, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User Registered successfully" });
});

//login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  //so this time if (!user) its not the user then no access to login
  if (!user) { 
    return res.json({ message: "User Doesn't Exist!" });
  }

  //checking to see if the password the user is providing is valid
  //We are using bcrypt to determine this...
  //so in this logic, we are just comparing the hashed to password to
  //to see if it matched, if not then ...
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is Incorrect!" });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

export { router as userRouter };
