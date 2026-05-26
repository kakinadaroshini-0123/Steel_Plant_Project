const leaveTable = document.getElementById("leaveData");

async function loadLeaves() {
  try {
    const response = await fetch("http://localhost:5000/leaves");
    const data = await response.json();

    if (!data.length) {
      leaveTable.innerHTML = `<tr><td colspan="7">No leave requests found.</td></tr>`;
      return;
    }

    leaveTable.innerHTML = data
      .map((item) => `
      <tr>
        <td>${item.id}</td>
        <td>${item.employee_id}</td>
        <td>${item.leave_type}</td>
        <td>${item.from_date} → ${item.to_date}</td>
        <td>${item.reason}</td>
        <td>${item.status}</td>
        <td class="action-buttons">
          <button class="approve" onclick="updateLeave(${item.id}, 'approve')">Approve</button>
          <button class="reject" onclick="updateLeave(${item.id}, 'reject')">Reject</button>
        </td>
      </tr>
    `)
      .join("");
  } catch (error) {
    leaveTable.innerHTML = `<tr><td colspan="7">Unable to load leave requests.</td></tr>`;
  }
}

window.updateLeave = async (id, action) => {
  try {
    const response = await fetch(`http://localhost:5000/${action}/${id}`, {
      method: "PUT"
    });
    const result = await response.json();
    alert(result.message || "Action completed");
    loadLeaves();
  } catch (error) {
    alert("Unable to update leave status");
  }
};

loadLeaves();
