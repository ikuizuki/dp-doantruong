async function deleteActivityapi(id) {
  if (!confirm("Bạn chắc chắn muốn xoá hoạt động này?")) return;

  const card = document.getElementById(`activity-${id}`);

  card.classList.add("fade-out");

  setTimeout(async () => {
    await fetch("/api/deleteActivity", {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ id }),
    });

    card.remove();
  }, 300);
}
