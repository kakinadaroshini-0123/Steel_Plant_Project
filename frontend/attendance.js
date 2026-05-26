const employeeId = localStorage.getItem("employeeId");
if (!employeeId) {
  window.location.href = "role.html";
}

async function loadAttendance() {
  try {
    const response = await fetch(`http://localhost:5000/attendance/${employeeId}`);
    const data = await response.json();

    const tbody = document.getElementById("attendanceTable");
    if (!data.length) {
      tbody.innerHTML = `<tr><td colspan="2">No attendance records available</td></tr>`;
      return;
    }

    tbody.innerHTML = data
      .map((item) => `
      <tr>
        <td>${item.attendance_date}</td>
        <td>${item.status}</td>
      </tr>
    `)
      .join("");
  } catch (error) {
    document.getElementById("attendanceTable").innerHTML = `<tr><td colspan="2">Unable to load attendance</td></tr>`;
  }
}

loadAttendance();
