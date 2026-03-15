let activities = [];
let editId = null;

/* PREVIEW IMAGE */

document.getElementById("image").addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = document.getElementById("preview");

      img.src = e.target.result;

      img.style.display = "block";
    };

    reader.readAsDataURL(file);
  }
});

/* LOAD ACTIVITIES */

async function loadAdminActivities() {
  const res = await fetch("/api/getActivities");

  activities = await res.json();

  renderAdminList();
}

/* RENDER LIST */

function renderAdminList() {
  const div = document.getElementById("activity-list");

  div.innerHTML = "";

  activities.forEach((a) => {
    div.innerHTML += `

<div class="activity-item">

<span class="activity-title">${a.title}</span>

<div>

<button class="edit-btn" onclick="editActivity('${a._id}')">Sửa</button>

<button class="delete-btn" onclick="deleteActivity('${a._id}')">Xóa</button>

</div>

</div>

`;
  });
}

/* ADD OR UPDATE */

async function addActivity() {
  const title = document.getElementById("title").value;

  const date = document.getElementById("date").value;

  const location = document.getElementById("location").value;

  const description = document.getElementById("description").value;

  const body = { title, date, location, description };

  if (editId) {
    body.id = editId;

    await fetch("/api/updateActivity", {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(body),
    });

    editId = null;
  } else {
    await fetch("/api/addActivity", {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(body),
    });
  }

  clearForm();

  loadAdminActivities();
}

/* EDIT */

function editActivity(id) {
  const act = activities.find((a) => a._id === id);

  document.getElementById("title").value = act.title;

  document.getElementById("date").value = act.date;

  document.getElementById("location").value = act.location;

  document.getElementById("description").value = act.description;

  editId = id;
}

/* DELETE */

async function deleteActivity(id) {
  if (!confirm("Bạn chắc chắn muốn xoá hoạt động này?")) return;

  await fetch("/api/deleteActivity", {
    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({ id }),
  });

  loadAdminActivities();
}

/* CLEAR FORM */

function clearForm() {
  document.getElementById("title").value = "";

  document.getElementById("date").value = "";

  document.getElementById("location").value = "";

  document.getElementById("description").value = "";

  document.getElementById("preview").style.display = "none";
}

/* INIT */

loadAdminActivities();
