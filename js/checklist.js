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

async function loadChecklist() {
  const res = await fetch(`/api/getChecklist?username=${username}`);
  const data = await res.json();

  const div = document.getElementById("checklist");
  div.innerHTML = "";

  data.forEach((a) => {
    div.innerHTML += `
      <div class="activity-card">
        ${a.image ? `<img src="${a.image}" class="activity-img">` : ""}

        <div class="activity-right">
          <h2>${a.title}</h2>
          <p>${a.description}</p>

          <!-- ✅ CHECKBOX Ở ĐÂY -->
          <label>
            <input type="checkbox"
              ${a.checked ? "checked" : ""}
              onchange="toggleCheck('${a._id}', this.checked)">
            Tham gia
          </label>
        </div>
      </div>
    `;
  });
}

async function toggleCheck(activityId, done) {
  const username = localStorage.getItem("username");

  await fetch("/api/addChecklist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      activityId,
      done,
    }),
  });
}

loadChecklist();
