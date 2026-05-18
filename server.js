const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// ================= MYSQL CONNECTION =================

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "system",
    database: "haasini"

});

db.connect((err) => {

    if (err) {

        console.log("Database Connection Failed");
        console.log(err.message);
        return;

    }

    console.log("MySQL Connected Successfully");

});


// ================= LOGIN API =================

app.post("/login", (req, res) => {

    const { username, password } = req.body;

    // ================= USERNAME VALIDATION =================

    // Must contain exactly 6 digits only

    const usernamePattern = /^[0-9]{6}$/;

    if (!usernamePattern.test(username)) {

        return res.send({

            success: false,

            message:
                "User ID must contain exactly 6 digits only"

        });

    }

    // ================= PASSWORD VALIDATION =================

    if (!password || password.length < 4) {

        return res.send({

            success: false,

            message:
                "Password must contain at least 4 characters"

        });

    }

    // ================= MYSQL QUERY =================

    const sql =
        "SELECT * FROM users WHERE username=? AND password=?";

    db.query(sql, [username, password], (err, result) => {

        if (err) {

            console.log(err);

            return res.send({

                success: false,

                message: "Database Error"

            });

        }

        // ================= LOGIN SUCCESS =================

        if (result.length > 0) {

            res.send({

                success: true,

                message: "Login Successful"

            });

        }

        // ================= LOGIN FAILED =================

        else {

            res.send({

                success: false,

                message: "Invalid User ID or Password "

            });

        }

    });

});


// ================= SERVER =================

app.listen(3000, () => {

    console.log("Server Running On Port 3000");

});