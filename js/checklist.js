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

// 👉 load checklist
async function loadChecklist() {
  const res = await fetch(`/api/getChecklist?username=${username}`);
  const data = await res.json();

  const div = document.getElementById("list");
  div.innerHTML = "";

  data.forEach((item) => {
    div.innerHTML += `
      <div>
        <input type="checkbox" ${item.done ? "checked" : ""}>
        ${item.text}
      </div>
    `;
  });
}

// 👉 thêm việc
async function addTask() {
  const text = document.getElementById("task").value;

  await fetch("/api/addChecklist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      text,
    }),
  });

  document.getElementById("task").value = "";
  loadChecklist();
}

loadChecklist();
