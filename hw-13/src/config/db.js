import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("successfully connected", connection.connection.host);
  } catch (error) {
    console.error("connection error");
    process.exit(1);
  }
};
