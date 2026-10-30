import dns from "node:dns";
import { MongoClient } from "mongodb";

// Some Windows setups leave Node's resolver pointing at localhost, which
// refuses the SRV lookup that mongodb+srv:// URIs need. Fall back to public DNS.
if (dns.getServers().every((s) => s === "127.0.0.1" || s === "::1")) {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

let clientPromise = null;

export function getMongoClient() {
  if (!clientPromise) {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not defined");
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
    // Don't cache a failed connection, so the next request retries
    clientPromise = client.connect().catch((err) => {
      clientPromise = null;
      throw err;
    });
  }
  return clientPromise;
}
