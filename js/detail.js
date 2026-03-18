const username = localStorage.getItem("username");

if (!username) {
  window.location.href = "login.html";
}

document.getElementById("hello").innerText = "Xin chào, " + username;

if (username === "admin") {
  document.getElementById("menu").innerHTML += `
    <a href="../html/admin.html" style="color:red;font-weight:bold">
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
  const id = parseInt(params.get("id"));

  const res = await fetch("/api/getActivities");
  const data = await res.json();

  const a = data[id];

  const detailDiv = document.getElementById("detail");
  const relatedDiv = document.getElementById("related");

  if (!a) {
    detailDiv.innerHTML = "<p>Không tìm thấy bài viết</p>";
    return;
  }

  detailDiv.innerHTML = `
    <a href="thongbao.html">← Quay lại</a>

    <h1 class="detail-title">${a.title}</h1>

    <div class="detail-meta">
      📅 ${a.date || ""} | 📍 ${a.location || ""}
    </div>

    <img src="${a.image}" class="detail-img">

    <p class="detail-desc">
      ${a.description.replace(/\n/g, "<br>")}
    </p>
  `;

  let count = 0;
  let relatedHTML = "";

  data.forEach((item, index) => {
    if (index !== id && count < 3) {
      relatedHTML += `
        <div class="related-item"
             onclick="location.href='detail.html?id=${index}'">
          <img src="${item.image}">
          <h4>${item.title}</h4>
        </div>
      `;
      count++;
    }
  });

  relatedDiv.innerHTML = relatedHTML;
}

loadDetail();
