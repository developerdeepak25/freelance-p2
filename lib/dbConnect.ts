import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached: {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Use global cache only in development to prevent hot reload issues
// if (process.env.NODE_ENV === "development") {

// eslint-disable-next-line @typescript-eslint/no-explicit-any
cached = (global as any).mongoose;
if (!cached) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cached = (global as any).mongoose = { conn: null, promise: null };
}
// } else {
// In production, we don't need the global cache
// cached = { conn: null, promise: null };
// }

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log("Using cached database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("MongoDB connected successfully");
        return mongoose;
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Handle application termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose connection closed due to application termination");
  process.exit(0);
});

export default dbConnect;
