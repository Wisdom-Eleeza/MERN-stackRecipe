import mongoose from "mongoose";

//the schema is an object that is going define the structure of our data
//so now, what do we want to know from our users
// 1.
const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  //we can have multiple of ingredients inside a recipe
  //so we have to wrap the String inside an array
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cookingTime: { type: Number, required: true },

  //so now we need to keep track of the user who created
  //the recipe so, 
  userOwner: {
    type: mongoose.Schema.Types.ObjectId, ref: "users", required: true
  }
});

//this userModel is going to be generated base on the schema
//so the "users" is the name that will be in the collection/table of the database
const recipeModel = mongoose.model("recipesTable", recipeSchema);

//so the userModel is what we are going to be using to make calls from the collection
export { recipeModel };
