const employeeId = localStorage.getItem("employeeId");

console.log("Employee ID from storage:", employeeId);

if (!employeeId) {
  alert("Employee ID not found. Redirecting...");
  window.location.href = "role.html";
}

async function loadProfile() {
  try {
    const response = await fetch(`http://localhost:5000/employee/${employeeId}`);

    if (!response.ok) {
      throw new Error("Server error or employee not found");
    }

    const data = await response.json();

    console.log("API DATA:", data);

    // TOP
    document.getElementById("top_name").innerText =
      data.full_name || "Employee";

    document.getElementById("top_id").innerText =
      data.employee_id || "";

    // FORM
    document.getElementById("employee_id").value =
      data.employee_id || "";

    document.getElementById("full_name").value =
      data.full_name || "";

    document.getElementById("department_input").value =
      data.department || "";

    document.getElementById("phone").value =
      data.phone || "";

    document.getElementById("email").value =
      data.email || "";

    document.getElementById("shift_name").value =
      data.shift_name || "";

    document.getElementById("blood_group").value =
      data.blood_group || "";

    document.getElementById("emergency_contact").value =
      data.emergency_contact || "";

    document.getElementById("address").value =
      data.address || "";

    // STATUS (NEW FIX)
    document.querySelector(".status-badge").innerText =
      data.employee_status || "Active";

  } catch (error) {
    console.error(error);
    alert("Unable to load employee details. Check backend/API.");
  }
}

loadProfile();