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
  // 1. Tin nổi bật
  const featured = list[0];
  document.getElementById("featured-news").innerHTML = `
    <div class="featured">
      <img src="${featured.image}">
      <h1>${featured.title}</h1>
    </div>
  `;

  // 2. Tin lớn bên trái
  const main = list[1];
  document.getElementById("main-news").innerHTML = `
    <div class="main-news">
      <img src="${main.image}">
      <h2>${main.title}</h2>
    </div>
  `;

  // 3. Tin nhỏ bên phải
  let sideHTML = "";
  list.slice(2, 5).forEach((a) => {
    sideHTML += `
      <div class="side-news-item">
        <img src="${a.image}">
        <p>${a.title}</p>
      </div>
    `;
  });
  document.getElementById("side-news").innerHTML = sideHTML;

  // 4. Danh sách kéo dài
  let listHTML = "";
  list.slice(5).forEach((a, index) => {
    listHTML += `
      <a href="../html/detail.html?id=${index}">
        <div class="news-item">
          <img src="${a.image}">
          <div>
            <h3>${a.title}</h3>
            <p>${a.description}</p>
          </div>
        </div>
      </a>
    `;
  });

  document.getElementById("news-list").innerHTML = listHTML;
}
loadActivities();
