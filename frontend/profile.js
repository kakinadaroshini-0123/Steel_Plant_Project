const employeeId = localStorage.getItem("employeeId");

if (!employeeId) {
  window.location.href = "role.html";
}

const editableFields = [
  "full_name",
  "department_input",
  "phone",
  "email",
  "shift_name",
  "blood_group",
  "address",
  "emergency_contact",
  "employee_status"
];

async function loadProfile() {
  try {
    const response = await fetch(`http://localhost:5000/employee/${employeeId}`);
    const data = await response.json();

    document.getElementById("name").innerText = data.full_name || "Employee";
    document.getElementById("department").innerText = data.department || "Department";
    document.getElementById("employee_id").value = data.employee_id || "";
    document.getElementById("full_name").value = data.full_name || "";
    document.getElementById("department_input").value = data.department || "";
    document.getElementById("phone").value = data.phone || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("shift_name").value = data.shift_name || "";
    document.getElementById("blood_group").value = data.blood_group || "";
    document.getElementById("address").value = data.address || "";
    document.getElementById("emergency_contact").value = data.emergency_contact || "";
    document.getElementById("employee_status").value = data.employee_status || "Active";

    setEditable(false);
  } catch (error) {
    alert("Unable to load profile");
  }
}

function setEditable(enabled) {
  editableFields.forEach((id) => {
    const field = document.getElementById(id);
    if (field) field.disabled = !enabled;
  });
}

function enableEdit() {
  setEditable(true);
}

async function updateProfile() {
  const updatedData = {
    full_name: document.getElementById("full_name").value,
    department: document.getElementById("department_input").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    shift_name: document.getElementById("shift_name").value,
    blood_group: document.getElementById("blood_group").value,
    address: document.getElementById("address").value,
    emergency_contact: document.getElementById("emergency_contact").value,
    employee_status: document.getElementById("employee_status").value
  };

  try {
    const response = await fetch(`http://localhost:5000/employee/${employeeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });
    const result = await response.json();
    alert(result.message || "Profile updated");
    setEditable(false);
    loadProfile();
  } catch (error) {
    alert("Unable to update profile");
  }
}

loadProfile();
