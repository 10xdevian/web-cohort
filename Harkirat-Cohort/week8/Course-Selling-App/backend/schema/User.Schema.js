const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:String,
  username: { type: String, unique: true },
  email:{type:String, unique:true},
  password:String,
})

const userModel = mongoose.model('Admin', UserSchema);

module.exports = userModel;
