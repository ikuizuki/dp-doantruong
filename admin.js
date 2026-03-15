async function loadAdminActivities() {
  const res = await fetch("/api/getActivities");

  const data = await res.json();

  const div = document.getElementById("activity-list");

  div.innerHTML = "";

  data.forEach((a) => {
    div.innerHTML += `

<div class="activity-item">

<span>${a.title} - ${a.date}</span>

<button class="delete-btn" onclick="deleteActivity('${a._id}')">Xoá</button>

</div>

`;
  });
}

async function addActivity() {
  const title = document.getElementById("title").value;

  const date = document.getElementById("date").value;

  const location = document.getElementById("location").value;

  const description = document.getElementById("description").value;

  await fetch("/api/addActivity", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      title,

      date,

      location,

      description,
    }),
  });

  loadAdminActivities();
}

async function deleteActivity(id) {
  if (!confirm("Xóa hoạt động này?")) return;

  await fetch("/api/deleteActivity", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ id }),
  });

  loadAdminActivities();
}

loadAdminActivities();
