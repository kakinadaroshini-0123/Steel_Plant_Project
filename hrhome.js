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

/* LOGOUT */

function logout(){

    localStorage.clear();

    window.location.href =
    "role.html";
}