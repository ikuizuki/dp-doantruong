async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  document.getElementById("msg").innerText = data.message;

  if (res.ok) {
    // 👉 lưu user
    localStorage.setItem("username", data.username);

    // 👉 chuyển trang
    window.location.href = "dp-doantruong.html";
  }
}
