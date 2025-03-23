const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

function dbConnect() {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=> {
        console.log("DB is Connected")
    }).catch((error) => { 
        console.log("error while connecting to DB",error)
    });
}

module.exports=dbConnect;
