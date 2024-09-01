document.getElementById("login").addEventListener("submit", function(event){
    event.preventDefault();
    let email = document.getElementById("email").value;
    let contraseña = document.getElementById("contr");

    if (email.value !== "" && contraseña.value !== ""){
     localStorage.setItem("loggedIn", "true",'userEmail', email);
    window.location.href = "index.html";
    }
})
