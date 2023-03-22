import mongoose from "mongoose";

//the schema is an object that is going to define the structure of our data
//so now, what do we want to know or want from our users
// 1.name of the user
//2. the password of the user 
//3. etc...
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //ref: recipes, we are referencing the recipes table
  savedRecipes: ({type: mongoose.Schema.Types.ObjectId, ref: "recipes"})
});

//this userModel is going to be generated base on the schema
//so the "users" is the name that will be in the collection/table of the database
const userModel = mongoose.model("users", userSchema);

//so the userModel is what we are going to be using to make calls from the collection
export { userModel };
