import { MongoClient } from "mongodb";

let clientPromise = null;

export function getMongoClient() {
  if (!clientPromise) {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not defined");
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}
