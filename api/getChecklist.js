import clientPromise from "../js/server.js";

export default async function handler(req, res) {
  try {
    const { username } = req.query;

    const client = await clientPromise;
    const db = client.db("chidoan");

    const activities = await db.collection("activities").find({}).toArray();

    const checklist = await db
      .collection("checklists")
      .find({ username })
      .sort({ createdAt: -1 }) // 👈 thêm dòng này
      .toArray();

    // 👉 map lại trạng thái
    const result = activities.map((a) => {
      const checked = checklist.find(
        (c) => c.activityId == a._id.toString() && c.done,
      );

      return {
        ...a,
        checked: !!checked,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
