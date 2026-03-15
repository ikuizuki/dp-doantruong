import clientPromise from "../server.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const client = await clientPromise;
  const db = client.db("chidoan");

  const { title, date, description, location, image } = req.body;

  await db.collection("activities").insertOne({
    title,
    date,
    description,
    location,
    image,
  });

  res.json({ success: true });
}
