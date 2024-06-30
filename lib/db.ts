import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: "next-api-test",
      bufferCommands: true,
    });
    console.log("Connected to MongoDB");
  } catch (err: any) {
    console.log("Error :", err);
    throw new Error("Error: ", err);
  }
};

export default connect;
