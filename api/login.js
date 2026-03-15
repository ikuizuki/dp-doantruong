export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { username, password } = req.body;

  if (username === "admin" && password === "123456") {
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
}
