const employeeId = localStorage.getItem("employeeId");
const userRole = localStorage.getItem("userRole");
const frame = document.getElementById("frame");
const navButtons = Array.from(document.querySelectorAll(".nav-item:not(.logout-btn)"));

if (!employeeId || userRole !== "employee") {
  window.location.href = "role.html";
}

function setActive(button) {
  navButtons.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const page = button.dataset.page;
    frame.src = page;
    setActive(button);
  });
});

document.querySelector(".logout-btn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "role.html";
});
