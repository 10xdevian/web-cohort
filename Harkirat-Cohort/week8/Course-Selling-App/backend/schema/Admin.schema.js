const mongoose  = require("mongoose");
const Schema = mongoose.Schema;


const AdminSchema = new Schema({
  name:String,
  username: { type: String, unique: true },
  email:{type:String, unique:true},
  password:String,
  
})

const adminModel = mongoose.model('Admin', AdminSchema);

module.exports = adminModel;