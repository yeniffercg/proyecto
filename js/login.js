document.getElementById("login").addEventListener("submit", function(event){
    event.preventDefault();
    let usuario = document.getElementById("usuario");
    let contraseña = document.getElementById("contr");

    if (usuario.value !== "" && contraseña.value !== ""){
     localStorage.setItem("loggedIn" , "true");
    window.location.href = "index.html";

    }
})
