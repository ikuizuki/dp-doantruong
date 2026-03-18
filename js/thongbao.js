async function loadActivities() {
  const res = await fetch("/api/getActivities");
  activities = await res.json();

  renderActivities(activities);
}
function renderActivities(list) {
  const div = document.getElementById("activities-list");
  div.innerHTML = "";

  list.forEach((a, index) => {
    div.innerHTML += `
      <a href="../html/detail.html?id=${index}" class="activity-link">
        <div class="activity-card">
          ${a.image ? `<img src="${a.image}" class="activity-img">` : ""}
          <div class="activity-right">
            <h2 class="activity-title">${a.title}</h2>
            <div class="activity-info">
              <span>📅 ${a.date}</span>
              <span>📍 ${a.location}</span>
            </div>
            <p class="activity-desc">${a.description}</p>
          </div>
        </div>
      </a>
    `;
  });
}
loadActivities();
