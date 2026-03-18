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
  if (!list || list.length === 0) return;

  // ⭐ 1. Tin nổi bật
  const f = list[0];
  document.getElementById("featured-news").innerHTML = `
    <div class="featured">
      <img src="${f.image}">
      <h1>${f.title}</h1>
    </div>
  `;

  // 📰 2. Tin lớn
  const m = list[1];
  document.getElementById("main-news").innerHTML = `
    <div class="main-news">
      <img src="${m.image}">
      <h2>${m.title}</h2>
      <p>${m.description || ""}</p>
    </div>
  `;

  // 📌 3. Tin nhỏ
  let side = "";
  list.slice(2, 5).forEach((a) => {
    side += `
      <div class="side-news-item">
        <img src="${a.image}">
        <p>${a.title}</p>
      </div>
    `;
  });
  document.getElementById("side-news").innerHTML = side;

  // 📚 4. Danh sách dài
  let news = "";
  list.slice(5).forEach((a) => {
    news += `
      <div class="news-item">
        <img src="${a.image}">
        <div>
          <h3>${a.title}</h3>
          <p>${a.description || ""}</p>
        </div>
      </div>
    `;
  });
  document.getElementById("news-list").innerHTML = news;

  // 🔥 5. Cột phải (Xem nhiều)
  let hot = "";
  list.slice(0, 5).forEach((a) => {
    hot += `
      <div class="hot-item">
        <img src="${a.image}">
        <p>${a.title}</p>
      </div>
    `;
  });
  document.getElementById("hot-news").innerHTML = hot;
}
loadActivities();
