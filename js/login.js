document.getElementById("login").addEventListener("submit", function(event){
    event.preventDefault();
    const user = document.getElementById("user").value;
    const contraseña = document.getElementById("contr");

    if (user.value !== "" && contraseña.value !== ""){
     localStorage.setItem("loggedIn", "true");
     localStorage.setItem("user", user);
    window.location.href = "index.html";
    }
})
