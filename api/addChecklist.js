import clientPromise from "../js/server.js";

export default async function handler(req, res) {
  try {
    const { username, activityId, done } = req.body;

    const client = await clientPromise;
    const db = client.db("chidoan");

    await db.collection("checklists").updateOne(
      { username, activityId },
      { $set: { done } },
      { upsert: true }, // 👉 chưa có thì tạo
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
