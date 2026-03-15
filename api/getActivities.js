import clientPromise from "../server.js";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("chidoan");

  const data = await db.collection("activities").find({}).toArray();

  res.json(data);
}
