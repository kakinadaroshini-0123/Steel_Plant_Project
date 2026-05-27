const db = require("../config/db");

// PROFILE
exports.getEmployee = (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM employees WHERE employee_id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.json(result[0]);
  });
};

// UPDATE PROFILE
exports.updateEmployee = (req, res) => {
  const id = req.params.id;
  const {
    full_name,
    department,
    phone,
    email,
    shift_name,
    blood_group,
    address,
    emergency_contact,
    employee_status
  } = req.body;

  db.query(
    `UPDATE employees SET
      full_name = ?,
      department = ?,
      phone = ?,
      email = ?,
      shift_name = ?,
      blood_group = ?,
      address = ?,
      emergency_contact = ?,
      employee_status = ?
    WHERE employee_id = ?`,
    [
      full_name,
      department,
      phone,
      email,
      shift_name,
      blood_group,
      address,
      emergency_contact,
      employee_status,
      id
    ],
    (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Unable to update profile" });
      }
      res.json({ success: true, message: "Profile updated" });
    }
  );
};

// ATTENDANCE
exports.getAttendance = (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM attendance WHERE employee_id = ? ORDER BY attendance_date DESC", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
    res.json(result);
  });
};

// SUBMIT LEAVE
exports.submitLeave = (req, res) => {
  const { employee_id, leave_type, from_date, to_date, reason } = req.body;

  db.query(
    `INSERT INTO leave_requests (
      employee_id,
      leave_type,
      from_date,
      to_date,
      reason,
      status
    ) VALUES (?, ?, ?, ?, ?, 'Pending')`,
    [employee_id, leave_type, from_date, to_date, reason],
    (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Unable to submit leave" });
      }
      res.json({ success: true, message: "Leave request submitted" });
    }
  );
};

// HR VIEW EMPLOYEES
// HR VIEW EMPLOYEES (ONLY EMPLOYEES, HIDE HR)
exports.getEmployees = (req, res) => {

  db.query(

    `SELECT
      e.employee_id,
      e.full_name,
      e.department,
      e.email,
      e.phone,
      e.employee_status
    FROM employees e
    JOIN users u
    ON e.employee_id = u.employee_id
    WHERE u.role='employee'
    ORDER BY e.full_name`,

    (err, result) => {

      if (err) {

        return res.status(500).json({
          success:false,
          message:"Server error"
        });

      }

      res.json(result);

    }

  );

};

// HR VIEW LEAVES
exports.getLeaves = (req, res) => {
  db.query("SELECT * FROM leave_requests ORDER BY id DESC", (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
    res.json(result);
  });
};

// APPROVE LEAVE
exports.approveLeave = (req, res) => {
  const id = req.params.id;

  db.query("UPDATE leave_requests SET status = 'Approved' WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Unable to approve leave" });
    }
    res.json({ success: true, message: "Leave approved" });
  });
};

// REJECT LEAVE
exports.rejectLeave = (req, res) => {
  const id = req.params.id;

  db.query("UPDATE leave_requests SET status = 'Rejected' WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Unable to reject leave" });
    }
    res.json({ success: true, message: "Leave rejected" });
  });
};
