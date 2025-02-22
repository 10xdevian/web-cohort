const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
  fullname:String,
  username:{type:String , unique:true},
  email:{type:String , unique:true},
  password:String,
  
})

const Todo = new Schema ({
  title : String,
  description:String,
  userId : ObjectId,
  // done : Boolean,
})

// now create the model 
const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

// export to use in different files
module.exports ={
  UserModel,
  TodoModel
}