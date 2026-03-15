import { MongoClient } from "mongodb";

const uri = process.env.URL_mongo;

let client;
let clientPromise;

if (!process.env.URL_mongo) {
  throw new Error("Missing Mongo URI");
}

client = new MongoClient(uri);
clientPromise = client.connect();

export default clientPromise;
