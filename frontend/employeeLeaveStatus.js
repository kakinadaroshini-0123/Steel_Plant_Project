const employeeId = localStorage.getItem("employeeId");

const table = document.getElementById("leaveStatusTable");

async function loadLeaveStatus() {
  try {
    if (!employeeId) {
      table.innerHTML = `
        <tr>
          <td colspan="5">Not logged in</td>
        </tr>
      `;
      return;
    }

    const response = await fetch(`http://localhost:5000/leave-status/${employeeId}`);
    const data = await response.json();

    if (!data || data.length === 0) {
      table.innerHTML = `
        <tr>
          <td colspan="5">No leave requests found</td>
        </tr>
      `;
      return;
    }

    table.innerHTML = data
      .map((item) => {
        const fromDate = new Date(item.from_date).toLocaleDateString("en-GB");
        const toDate = new Date(item.to_date).toLocaleDateString("en-GB");

        return `
          <tr>
            <td>${item.leave_type}</td>
            <td>${fromDate}</td>
            <td>${toDate}</td>
            <td>${item.reason || ''}</td>
            <td class="${item.status === 'Approved' ? 'approved' : ''} ${item.status === 'Rejected' ? 'rejected' : ''}">${item.status}</td>
          </tr>
        `;
      })
      .join("");
  } catch (error) {
    console.error(error);
    table.innerHTML = `
      <tr>
        <td colspan="5">Unable to load leave status</td>
      </tr>
    `;
  }
}

loadLeaveStatus();