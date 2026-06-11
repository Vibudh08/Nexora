import mongoose from "mongoose";

import { getServerEnv } from "@/lib/env/server-env";
import { configureDevelopmentDns } from "@/lib/utils/configure-development-dns";

type MongooseCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cache = globalForMongoose.mongooseCache ?? {
  connection: null,
  promise: null,
};

globalForMongoose.mongooseCache = cache;

export async function connectToDatabase() {
  if (cache.connection) return cache.connection;

  configureDevelopmentDns();

  const uri = getServerEnv().MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  cache.promise ??= mongoose.connect(uri, {
    bufferCommands: false,
  });

  try {
    cache.connection = await cache.promise;
    return cache.connection;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
}
