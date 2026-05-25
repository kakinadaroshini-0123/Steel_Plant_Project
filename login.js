// login.js

const role =
localStorage.getItem("userRole");

/* ROLE TITLE */

const roleTitle =
document.getElementById("roleTitle");

if(role === "hr"){

    roleTitle.innerText =
    "HR Login";
}

else{

    roleTitle.innerText =
    "Employee Login";
}

/* ELEMENTS */

const loginForm =
document.getElementById("loginForm");

const useridInput =
document.getElementById("userid");

const passwordInput =
document.getElementById("password");

const togglePassword =
document.getElementById("togglePassword");

/* POPUP */

const popup =
document.getElementById("popup");

const popupTitle =
document.getElementById("popupTitle");

const popupMessage =
document.getElementById("popupMessage");

function showPopup(type,title,message){

    popup.style.display = "flex";

    popup.className =
    "popup " + type;

    popupTitle.innerText =
    title;

    popupMessage.innerText =
    message;
}

function closePopup(){

    popup.style.display =
    "none";
}

/* PASSWORD TOGGLE */

togglePassword.addEventListener("click",()=>{

    if(passwordInput.type === "password"){

        passwordInput.type =
        "text";

        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye-slash"></i>';
    }

    else{

        passwordInput.type =
        "password";

        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye"></i>';
    }
});

/* LOGIN */

loginForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const userid =
    useridInput.value;

    const password =
    passwordInput.value;

    try{

        const response =
        await fetch(

            "http://localhost:3000/login",

            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    userid,
                    password,
                    role
                })
            }
        );

        const data =
        await response.json();

        if(data.success){

            /* SAVE EMPLOYEE ID */

            localStorage.setItem(

                "employeeId",

                userid
            );

            showPopup(

                "success",

                "Success",

                "Login Successful"
            );

            setTimeout(()=>{

                if(role === "hr"){

                    window.location.href =
                    "hrhome.html";
                }

                else{

                    window.location.href =
                    "employeehome.html";
                }

            },1500);

        }

        else{

            showPopup(

                "error",

                "Failed",

                "Invalid Credentials"
            );
        }

    }

    catch(error){

        console.log(error);

        showPopup(

            "error",

            "Server Error",

            "Backend Connection Failed"
        );
    }
});