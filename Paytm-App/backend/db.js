import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("✅ Database connected"),
    );
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
