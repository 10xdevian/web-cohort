const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const Types = mongoose.Types;

const CourseSchema = new Schema({
  title:String,
  description :String,
  price:Number,
  imageUrl:String,
  // category:String,
  createrId:{type:Types.ObjectId, ref:"Admin"},
})

const PurchasedCourseSchema = new Schema({
  userId:ObjectId,
  courseId:ObjectId,
})

const courseModel = mongoose.model('courses', CourseSchema);
const purchasedCourseModel = mongoose.model('purchasedCourses', PurchasedCourseSchema);

module.exports={
  courseModel,
  purchasedCourseModel
}