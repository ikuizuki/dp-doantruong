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

  // DETAIL
  detailDiv.innerHTML = `
    <a href="thongbao.html" class="back-btn">← Quay lại</a>

    <h1 class="detail-title">${a.title}</h1>

    <div class="detail-meta">
      📅 ${a.date || ""} | 📍 ${a.location || ""}
    </div>

    <div class="detail-img-wrapper">
      <img src="${a.image}" class="detail-img">
    </div>

    <p class="detail-desc">
      ${a.description.replace(/\n/g, "<br>")}
    </p>
  `;

  // RELATED (lấy random 3 bài khác)
  let relatedHTML = "";

  data.forEach((item, index) => {
    if (index !== id && relatedHTML.split("related-item").length <= 3) {
      relatedHTML += `
        <div class="related-item"
             onclick="location.href='detail.html?id=${index}'">
          <img src="${item.image}" 
               onerror="this.src='../pic/default.jpg'">
          <h4>${item.title}</h4>
        </div>
      `;
    }
  });

  relatedDiv.innerHTML = relatedHTML;
}

loadDetail();
