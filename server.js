const express = require("express");

const mysql = require("mysql2");

const cors = require("cors");

const path = require("path");

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());

app.use(express.json());

/* ================= HOME PAGE ================= */

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "role.html")
    );

});

/* ================= STATIC FILES ================= */

app.use(express.static(__dirname));

/* ================= MYSQL CONNECTION ================= */

const db = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "system",

    database: "haasini"

});

/* ================= CONNECT DATABASE ================= */

db.connect((err) => {

    if (err) {

        console.log("Database Error");

        console.log(err);

    }

    else {

        console.log(
            "MySQL Connected Successfully"
        );

    }

});

/* ================= LOGIN API ================= */

app.post("/login", (req, res) => {

    const {

        userid,

        password,

        role

    } = req.body;

    console.log("User ID:", userid);

    console.log("Password:", password);

    console.log("Role:", role);

    /* ================= SQL QUERY ================= */

    const sql =

    `SELECT * FROM users
     WHERE userid = ?
     AND password = ?
     AND role = ?`;

    db.query(

        sql,

        [userid, password, role],

        (err, result) => {

            if (err) {

                console.log(err);

                res.send({

                    success: false,

                    message: "Database Error"

                });

            }

            else {

                if (result.length > 0) {

                    res.send({

                        success: true,

                        message:
                        "Login Successful"

                    });

                }

                else {

                    res.send({

                        success: false,

                        message:
                        "Invalid User ID or Password"

                    });

                }

            }

        }

    );

});

/* ================= START SERVER ================= */

app.listen(3000, () => {

    console.log(
        "Server Running On Port 3000"
    );

});
