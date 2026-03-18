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
