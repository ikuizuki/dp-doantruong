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
    localStorage.setItem("admin", "true");

    window.location.href = "/admin.html";
  } else {
    document.getElementById("error").style.display = "block";
  }
}
