const express = require("express");

const mysql = require("mysql2");

const cors = require("cors");

const path = require("path");

const app = express();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

/* STATIC FILES */

app.use(express.static(__dirname));

/* MYSQL CONNECTION */

const db = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "SQL123",

    database: "steelplant"
});

/* CONNECT MYSQL */

db.connect((err) => {

    if(err){

        console.log(err);

    } else {

        console.log(
            "MySQL Connected"
        );
    }
});

/* OPEN ROLE PAGE */

app.get("/", (req, res) => {

    res.sendFile(

        path.join(
            __dirname,
            "role.html"
        )
    );
});

/* LOGIN API */

app.post("/login", (req, res) => {

    const {
        userid,
        password,
        role
    } = req.body;

    const sql =

    `SELECT * FROM users
     WHERE employee_id = ?
     AND password = ?
     AND role = ?`;

    db.query(

        sql,

        [userid, password, role],

        (err, result) => {

            if(err){

                console.log(err);

                res.json({
                    success:false
                });

            } else {

                if(result.length > 0){

                    res.json({
                        success:true
                    });

                } else {

                    res.json({
                        success:false
                    });
                }
            }
        }
    );
});

/* ATTENDANCE API */

app.get(

    "/attendance/:id",

    (req,res)=>{

        const employeeId =
        req.params.id;

        const query = `

        SELECT *

        FROM employee_attendance

        WHERE employee_id = ?

        ORDER BY attendance_date

        `;

        db.query(

            query,

            [employeeId],

            (err,result)=>{

                if(err){

                    console.log(err);

                    return res.status(500).json({

                        success:false
                    });
                }

                res.json(result);
            }
        );
    }
);

/* SERVER */

app.listen(3000, () => {

    console.log(
        "Server Running On Port 3000"
    );
});