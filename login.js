const role =
localStorage.getItem("userRole");

console.log("Selected Role:", role);

/* ================= ELEMENTS ================= */

const loginForm =
document.getElementById("loginForm");

const passwordInput =
document.getElementById("password");

const togglePassword =
document.getElementById("togglePassword");

const useridInput =
document.getElementById("userid");

/* ================= DYNAMIC LENGTH ================= */

if(role === "trainee"){

    useridInput.maxLength = 9;

    useridInput.placeholder =
    "Enter 9 Digit Trainee ID";

}

else{

    useridInput.maxLength = 6;

    useridInput.placeholder =
    "Enter 6 Digit User ID";

}

/* ================= SHOW PASSWORD ================= */

togglePassword.addEventListener("click", () => {

    if(passwordInput.type === "password"){

        passwordInput.type = "text";

        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye-slash"></i>';

    }

    else{

        passwordInput.type = "password";

        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye"></i>';

    }

});

/* ================= LOGIN ================= */

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const userid =
    useridInput.value;

    const password =
    passwordInput.value;

    /* ================= VALIDATION ================= */

    let useridPattern;

    if(role === "trainee"){

        useridPattern = /^[0-9]{9}$/;

    }

    else{

        useridPattern = /^[0-9]{6}$/;

    }

    if(!useridPattern.test(userid)){

        if(role === "trainee"){

            alert(
            "Trainee ID must contain exactly 9 digits"
            );

        }

        else{

            alert(
            "User ID must contain exactly 6 digits"
            );

        }

        return;

    }

    /* ================= API ================= */

    try{

        const response = await fetch(

            "http://localhost:3000/login",

            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    userid: userid,

                    password: password,

                    role: role

                })

            }

        );

        const data =
        await response.json();

        console.log(data);

        /* ================= SUCCESS ================= */

        if(data.success){

            alert("✅ Login Successful");

            if(role === "employee"){

                window.location.href =
                "employee.html";

            }

            else if(role === "admin"){

                window.location.href =
                "admin.html";

            }

            else if(role === "trainee"){

                window.location.href =
                "trainee.html";

            }

        }

        else{

            alert("❌ " + data.message);

        }

    }

    catch(error){

        console.log(error);

        alert("⚠ Server Error");

    }

});
