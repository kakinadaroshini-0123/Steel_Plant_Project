const employeeId = localStorage.getItem("employeeId");
const userRole = localStorage.getItem("userRole");
const frame = document.getElementById("frame");
const navItems = Array.from(document.querySelectorAll(".nav-item:not(.logout-btn)"));

if (!employeeId || userRole !== "hr") {
  window.location.href = "role.html";
}

document.getElementById("username").innerText = "HR Manager";
document.getElementById("welcomeName").innerText = "Steel Plant HR";

navItems.forEach((button) => {
  button.addEventListener("click", () => {
    const page = button.dataset.page;
    frame.src = page;
    navItems.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

document.querySelector(".logout-btn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "role.html";
});
