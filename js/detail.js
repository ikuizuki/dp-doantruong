async function loadDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const res = await fetch("/api/getActivities");
  const data = await res.json();

  const a = data[id];

  const div = document.getElementById("detail");

  div.innerHTML = `
    <h1>${a.title}</h1>
    <p>📅 ${a.date} | 📍 ${a.location}</p>
    <img src="${a.image}" style="width:400px">
    <p>${a.description}</p>
  `;
}

loadDetail();
