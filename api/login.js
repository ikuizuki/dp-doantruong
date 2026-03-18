import clientPromise from "../js/server.js";

export default async function handler(req, res) {
  try {
    const { username, password } = req.body;

    const client = await clientPromise;
    const db = client.db("chidoan");

    const users = db.collection("users");

    const user = await users.findOne({ username });

    // 👉 nếu đã có user
    if (user) {
      if (user.password === password) {
        return res.json({
          message: "Đăng nhập thành công",
          username: user.username,
        });
      } else {
        return res.status(401).json({
          message: "Sai mật khẩu",
        });
      }
    }

    // 👉 nếu chưa có → tạo luôn
    await users.insertOne({
      username,
      password,
    });

    res.json({
      message: "Tạo tài khoản & đăng nhập thành công",
      username,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
