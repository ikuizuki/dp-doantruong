import clientPromise from "../js/server.js";

export default async function handler(req, res) {
  try {
    const { username, text } = req.body;

    const client = await clientPromise;
    const db = client.db("chidoan");

    await db.collection("checklists").insertOne({
      username,
      text,
      done: false,
    });

    res.json({ message: "Đã thêm" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
