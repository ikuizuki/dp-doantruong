async function loadActivities() {
  const res = await fetch("/api/getActivities");

  const data = await res.json();

  const div = document.getElementById("activities");

  if (!div) return;

  data.forEach((a) => {
    div.innerHTML += `
<div class="card">
<h3>${a.title}</h3>
<p>${a.date}</p>
<p>${a.location}</p>
<p>${a.description}</p>
</div>
`;
  });
}

loadActivities();

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (data.success) {
    document.getElementById("panel").style.display = "block";
  } else {
    alert("Sai tài khoản");
  }
}

async function add() {
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

  alert("Đã đăng");
}
