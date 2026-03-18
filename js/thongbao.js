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

  list.forEach((a, index) => {
    html += `
      <a href="../html/detail.html?id=${index}" style="text-decoration:none;color:black">
        <div class="news-row">
          <img src="${a.image}" onerror="this.src='../pic/default.jpg'">

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

  container.innerHTML = html;
}

loadActivities();
