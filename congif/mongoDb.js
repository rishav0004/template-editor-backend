import * as mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.DB}`);
    console.log("Mongoose connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;