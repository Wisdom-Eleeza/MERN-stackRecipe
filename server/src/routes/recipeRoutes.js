import express, { response } from "express";
import mongoose from "mongoose";
import { recipeModel } from "../models/recipes.js";
import { userModel } from "../models/userModels.js";

const router = express.Router();

// get request to return all the recipes in the database
// this is what we are calling inside the homepage
// so in the homepage we want to see all the recipes that are in the database
// to display on the homepage
router.get("/", async (req, res) => {
  try {
    //recipeModel.find({}) is returning all the
    // collections in the model. We can make a
    //specific request but because we want to get
    // all the recipes thats why we used empty bracket({})
    const response = await recipeModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

//this post request is the routes that
//is creating the recipes in the database...
router.post("/", async (req, res) => {
  //new recipeModel(req.body) is the request from
  //the user. What the user want...
  //e.g. ingredient, cookingTime ...
  //const recipe = new recipeModel({
  //    ...req.body
  //}) the code can be written like this as well...
  const recipe = new recipeModel(req.body);
  try {
    const response = await recipe.save();
    console.log(response);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

//Router for users to be able to save recipe
//so to do that.. we go the userModel and add an
//array of
// so now we have savedRecipes field inside the
//userModel

router.put("/", async (req, res) => {
  // so we are going to get the userId and recipeId
  //and we are using the userId to find which user
  //we want to save to change the recipeId field
  // and then get the recipeId to insert into the array
  // {userId, recipeId}
  try {
    const recipe = await recipeModel.findById(req.body.recipeID); //finding the recipeID that we want to save
    //we are going to find user who is saving the specific recipe
    const user = await userModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

//In the frontend, we want to get a list of all the recipes id that the user
// who is login at the moment have saved...

router.get("/savedRecipes/ids", async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    console.log(error);
  }
});

//router to get the savedRecipes
router.get("/savedRecipes", async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userID);
    const savedRecipes = await recipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (error) {
    console.log(error);
  }
});

export { router as routerRecipes };
