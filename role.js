function selectRole(role){

    localStorage.setItem(
        "userRole",
        role
    );

    console.log(role);

    window.location.href =
    "login.html";
}