import clientPromise from "../js/server.js";

export default async function handler(req, res) {
  try {
    const { username } = req.query;

    const client = await clientPromise;
    const db = client.db("chidoan");

    const data = await db.collection("checklists").find({ username }).toArray();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
