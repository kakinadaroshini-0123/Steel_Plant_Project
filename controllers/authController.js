const db = require("../config/db");

exports.login = (req, res) => {
  const { employee_id, password } = req.body;

  const sql = `SELECT * FROM users WHERE employee_id = ? AND password = ?`;

  db.query(sql, [employee_id, password], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length > 0) {
      return res.json({
        success: true,
        employee_id: result[0].employee_id,
        role: result[0].role
      });
    }

    return res.json({ success: false, message: "Invalid credentials" });
  });
};

exports.status = (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database connection failed" });
    }

    return res.json({ success: true, message: "Backend and database connected" });
  });
};
