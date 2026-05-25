const sidebar =
document.getElementById("sidebar");

const menuButton =
document.getElementById("menuButton");

const closeMenu =
document.getElementById("closeMenu");

const content =
document.getElementById("content");

const employeeId =
localStorage.getItem("employeeId");

/* SHOW EMPLOYEE ID */

document.getElementById(
    "employeeText"
).innerText =

`Employee ID : ${employeeId}`;

/* SIDEBAR */

menuButton.addEventListener("click",()=>{

    sidebar.classList.add("active");
});

closeMenu.addEventListener("click",()=>{

    sidebar.classList.remove("active");
});

/* DASHBOARD */

function showDashboard(){

    content.innerHTML = `

    <div class="dashboard-box">

        <h2>
            LOGIN SUCCESSFUL
        </h2>

        <p>
            Employee ID : ${employeeId}
        </p>

    </div>

    `;
}

/* ATTENDANCE */

async function showAttendance(){

    const employeeId =

    localStorage.getItem(

        "employeeId"
    );

    try{

        const response =

        await fetch(

            `http://localhost:3000/attendance/${employeeId}`
        );

        const data =

        await response.json();

        let rows = "";

        data.forEach((record)=>{

            let statusClass = "";

            if(record.status === "Present"){

                statusClass = "present";
            }

            else if(record.status === "Absent"){

                statusClass = "absent";
            }

            else{

                statusClass = "holiday";
            }

            const formattedDate =

            new Date(

                record.attendance_date

            ).toLocaleDateString(

                "en-GB"
            );

            rows += `

            <tr>

                <td>
                    ${formattedDate}
                </td>

                <td>
                    ${record.day}
                </td>

                <td class="${statusClass}">

                    ${record.status}

                </td>

            </tr>

            `;
        });

        content.innerHTML = `

        <div class="attendance-box">

            <h2>
                Attendance Records
            </h2>

            <table>

                <thead>

                    <tr>

                        <th>Date</th>

                        <th>Day</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    ${rows}

                </tbody>

            </table>

        </div>

        `;
    }

    catch(error){

        console.log(error);
    }
}

/* LOGOUT */

function logout(){

    localStorage.clear();

    window.location.href =
    "role.html";
}