let activities = [];

/* LOAD ACTIVITIES */

async function loadActivities() {
  const res = await fetch("/api/getActivities");
  activities = await res.json();

  renderActivities(activities);
  renderTimeline(activities);
}

function renderActivities(list) {
  const div = document.getElementById("activities-list");
  div.innerHTML = "";

  list.forEach((a) => {
    div.innerHTML += `
<div class="card">

<h3>${a.title}</h3>

<p><b>Ngày:</b> ${a.date}</p>

<p><b>Địa điểm:</b> ${a.location}</p>

<p>${a.description}</p>

</div>
`;
  });
}

/* SEARCH */

function searchActivity() {
  const key = document.getElementById("search").value.toLowerCase();

  const filtered = activities.filter((a) =>
    a.title.toLowerCase().includes(key),
  );

  renderActivities(filtered);
}

/* TIMELINE */

function renderTimeline(list) {
  const div = document.getElementById("timeline-list");
  div.innerHTML = "";

  list.forEach((a) => {
    div.innerHTML += `

<div class="timeline-item">

<div class="timeline-date">${a.date}</div>

<div class="timeline-content">

<h4>${a.title}</h4>

<p>${a.description}</p>

</div>

</div>

`;
  });
}

/* SLIDESHOW */

let slides = document.querySelectorAll(".slide");

let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");

  index++;

  if (index >= slides.length) index = 0;

  slides[index].classList.add("active");
}, 4000);

loadActivities();
