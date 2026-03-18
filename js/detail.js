const username = localStorage.getItem("username");

if (!username) {
  window.location.href = "login.html";
}
const menu = document.getElementById("menu");
// 👉 nếu là admin
if (username === "admin") {
  menu.innerHTML += `
    <a href="../html/admin.html" style="color:red; font-weight:bold;">
      QUẢN LÝ
    </a>
  `;
}
function logout() {
  localStorage.removeItem("username");
  window.location.href = "../html/login.html";
}
async function loadDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const res = await fetch("/api/getActivities");
  const data = await res.json();

  const a = data[id];

  const div = document.getElementById("detail");

  div.innerHTML = `
    <h1>${a.title}</h1>
    <p>📅 ${a.date} | 📍 ${a.location}</p>
    <img src="${a.image}" style="width:400px">
    <p>${a.description}</p>
  `;
}

loadDetail();
