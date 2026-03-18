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
// 👉 hiện xin chào
const hello = document.getElementById("hello");
if (hello) {
  hello.innerText = "Xin chào, " + username;
}

async function loadActivities() {
  const res = await fetch("/api/getActivities");
  activities = await res.json();

  renderActivities(activities);
}
function renderActivities(list) {
  const container = document.getElementById("news-list");
  container.innerHTML = "";

  list.forEach((a, index) => {
    container.innerHTML += `
      <a href="../html/detail.html?id=${index}" style="text-decoration:none; color:black;">
        <div class="news-row">
          <img src="${a.image}">
          <div class="news-content">
            <h2>${a.title}</h2>

            <div class="meta">
              <span>📅 ${a.date || ""}</span>
              <span>📍 ${a.location || ""}</span>
            </div>

            <p>${a.description || ""}</p>
          </div>
        </div>
      </a>
    `;
  });
}
loadActivities();
