import clientPromise from "../js/server.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.body;

  const client = await clientPromise;
  const db = client.db("chidoan");

  await db.collection("activities").deleteOne({
    _id: new ObjectId(id),
  });

  res.json({ success: true });
}
