const employeeId = localStorage.getItem("employeeId");

if (!employeeId) {

  window.location.href = "role.html";

}

async function loadProfile() {

  try {

    const response = await fetch(
      `http://localhost:5000/employee/${employeeId}`
    );

    const data = await response.json();

    /* TOP CARD */

    document.getElementById("top_name").innerText =
      data.full_name || "Employee";

    document.getElementById("top_id").innerText =
      data.employee_id || "";

    /* FORM DETAILS */

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

    document.getElementById("address").value =
      data.address || "";

    document.getElementById("emergency_contact").value =
      data.emergency_contact || "";

    document.getElementById("employee_status").value =
      data.employee_status || "Active";

  }

  catch (error) {

    console.log(error);

    alert("Unable to load profile");

  }

}

loadProfile();