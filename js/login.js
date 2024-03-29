let usersArray = JSON.parse(localStorage.getItem("users"));
let db = localStorage
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let user = form.elements.user.value;
    let password = form.elements.password.value;

    if (user.trim() === "" || password.trim() === "") {
        Swal.fire({
            title: "Error!",
            text: "Por favor ingrese su usuario y contraseña.",
            icon: "error",
            confirmButtonText: "Ok"
        });
        return;
    }

    // Validar si se están ingresando las credenciales de administrador
    let isAdmin = user.toLowerCase() === "breakorfixadmin" && password === "BreakOrFixed2023";
    if (isAdmin) {
        let adminUser = usersArray.find(u => u.user === "breakorfixadmin");
        db.setItem("currentUser", JSON.stringify(adminUser));
        window.location.href = "administracion.html";
        return;
    }

    let currentUser = usersArray.find(u => u.user === user && u.password === password);

    if (currentUser) {
        db.setItem("currentUser", JSON.stringify(currentUser));

        if (currentUser.isAdmin) {
            window.location.href = "administracion.html";
        } else {
            console.log(window.location.href = "../index.html");
        }
    } else {
        Swal.fire({
            title: "Error!",
            text: "Usuario o contraseña incorrectos.",
            icon: "error",
            confirmButtonText: "Ok"
        });
    }
});