import clientPromise from "../js/server.js";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("chidoan");

  const data = await db
    .collection("activities")
    .find({})
    .sort({ createdAt: -1 }) // 👈 thêm dòng này
    .toArray();

  res.json(data);
}
