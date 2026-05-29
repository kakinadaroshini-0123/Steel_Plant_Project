const leaveForm = document.getElementById("leaveForm");

const employeeId = localStorage.getItem("employeeId");

if (!employeeId) {
  window.location.href = "role.html";
}

leaveForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const leaveData = {
    id: Date.now(),
    employee_id: employeeId,
    leave_type: document.getElementById("leaveType").value,
    from_date: document.getElementById("fromDate").value,
    to_date: document.getElementById("toDate").value,
    reason: document.getElementById("reason").value,
    status: "Pending"
  };

  let leaves = JSON.parse(localStorage.getItem("leaves")) || [];

  leaves.push(leaveData);

  localStorage.setItem("leaves", JSON.stringify(leaves));

  alert("Leave Request Submitted");

  leaveForm.reset();

});