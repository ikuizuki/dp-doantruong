import clientPromise from "../server.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;

  const db = client.db("chidoan");

  const { id, title, date, location, description } = req.body;

  await db.collection("activities").updateOne(
    { _id: new ObjectId(id) },

    { $set: { title, date, location, description } },
  );

  res.json({ success: true });
}
