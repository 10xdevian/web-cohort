const mongoose = require("mongoose");
const { DB_CONNECT } = require("./config");

async function connectTODB(){
  try{
    await mongoose.connect(DB_CONNECT);
    console.log("DB is Connected")
  }catch (error){
    console.log("error while connnecting to the DB", error);
  }
}

module.exports = connectTODB;