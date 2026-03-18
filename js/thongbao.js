const username = localStorage.getItem("username");

// chưa login → đá về login
if (!username) {
  window.location.href = "login.html";
}

// hello
document.getElementById("hello").innerText = "Xin chào, " + username;

// admin menu
if (username === "admin") {
  document.getElementById("menu").innerHTML += `
    <a href="../html/admin.html" style="color:red;font-weight:bold">
      QUẢN LÝ
    </a>
  `;
}

// logout
function logout() {
  localStorage.removeItem("username");
  window.location.href = "../html/login.html";
}

// load data
async function loadActivities() {
  const container = document.getElementById("news-list");
  container.innerHTML = "<p>Đang tải...</p>";

  try {
    const res = await fetch("/api/getActivities");
    const data = await res.json();
    renderActivities(data);
  } catch (err) {
    container.innerHTML = "<p>Lỗi tải dữ liệu</p>";
  }
}

// render
function renderActivities(list) {
  const container = document.getElementById("news-list");

  let html = "";

  if (list.length === 0) {
    container.innerHTML = "<p>Không có dữ liệu</p>";
    return;
  }

  // ⭐ TOP 3
  html += `
  <a href="../html/detail.html?id=${1}" style="text-decoration:none;color:black">
    <div class="top-news">

      <!-- BIG -->
      <div class="big-news">
        <img src="${list[0].image}">
        <div class="news-content">
          <h2>${list[0].title}</h2>
          <div class="meta">
            📅 ${list[0].date || ""}
          </div>
          <p>${list[0].description || ""}</p>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="side-news">
  </a>
  `;

  for (let i = 1; i <= 2 && i < list.length; i++) {
    html += `
    <a href="../html/detail.html?id=${i}" style="text-decoration:none;color:black">
      <div class="small-news">
        <img src="${list[i].image}">
        <div class="news-content">
          <h3>${list[i].title}</h3>
        </div>
      </div>
    </a>
    `;
  }

  html += `</div></div>`;

  // ⭐ PHẦN DƯỚI
  html += `<div class="bottom-news">`;

  html += `<div class="left-list">`;
  for (let i = 3; i < list.length; i += 2) {
    html += createNewsRow(list[i], i);
  }
  html += `</div>`;

  html += `<div class="right-list">`;
  for (let i = 4; i < list.length; i += 2) {
    html += createNewsRow(list[i], i);
  }
  html += `</div>`;

  html += `</div>`;

  container.innerHTML = html;
}

// component tái sử dụng
function createNewsRow(a, index) {
  return `
    <a href="../html/detail.html?id=${index}" style="text-decoration:none;color:black">
      <div class="news-row">
        <img src="${a.image}">
        <div class="news-content">
          <h2>${a.title}</h2>
          <div class="meta">
            📅 ${a.date || ""}
          </div>
          <p>${a.description || ""}</p>
        </div>
      </div>
    </a>
  `;
}

loadActivities();
