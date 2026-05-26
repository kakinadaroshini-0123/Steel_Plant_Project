const employeeTable = document.getElementById("employeeTable");

async function loadEmployees() {
  try {
    const response = await fetch("http://localhost:5000/employees");
    const data = await response.json();

    if (!data.length) {
      employeeTable.innerHTML = `<tr><td colspan="6">No employees found.</td></tr>`;
      return;
    }

    employeeTable.innerHTML = data
      .map((employee) => `
      <tr>
        <td>${employee.employee_id}</td>
        <td>${employee.full_name}</td>
        <td>${employee.department}</td>
        <td>${employee.email}</td>
        <td>${employee.phone}</td>
        <td>${employee.employee_status}</td>
      </tr>
    `)
      .join("");
  } catch (error) {
    employeeTable.innerHTML = `<tr><td colspan="6">Unable to load employees.</td></tr>`;
  }
}

loadEmployees();
