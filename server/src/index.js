import express from "express"; // const express = require('express')
import cors from "cors"; //cors allows the rules of communication between the frontend and backend
import mongoose from "mongoose";
import dotenv from 'dotenv'

const Port = process.env.PORT || 3001

dotenv.config()

const app = express();

app.use(express.json()); //this middleware is converting data send from the frontend to JSON format
app.use(cors());

mongoose.createConnection(process.env.DATABASE_CONNECT)

app.listen(Port, () => {
    console.log(`SERVER STARTED ON http://localhost: ${Port}`)
  })
