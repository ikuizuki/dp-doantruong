import clientPromise from "../server.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;

  const db = client.db("chidoan");

  const { id } = req.body;

  await db.collection("activities").deleteOne({
    _id: new ObjectId(id),
  });

  res.json({ success: true });
}
