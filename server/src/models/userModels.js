import mongoose from "mongoose";

//the schema is an object that is going define the structure of our data
//so now, what do we want to know from our users
// 1.
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//this userModel is going to be generated base on the schema
//so the "users" is the name that will be in the collection/table of the database
const userModel = mongoose.model("users", userSchema);

//so the userModel is what we are going to be using to make calls from the collection
export { userModel };
