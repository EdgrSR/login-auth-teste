const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
  window.location.href = "index.html";
} else {
  document.getElementById(
    "welcomeMessage"
  ).textContent = `Olá, ${loggedInUser.name}!`;
}

document.getElementById("logoutButton").addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
});
