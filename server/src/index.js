import express from "express"; // const express = require('express')
import cors from "cors"; //cors allows the rules of communication between the frontend and backend
import mongoose from "mongoose";
import dotenv from 'dotenv'

const app = express();

app.use(express.json()); //this middleware is converting data send from the frontend to JSON format
app.use(cors());

mongoose.connect("DATABASE_CONNECT")

app.listen(3001, () => console.log("SERVER STARTED"));
