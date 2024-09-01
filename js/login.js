document.getElementById("login").addEventListener("submit", function(event){
    event.preventDefault();
    const email = document.getElementById("email").value;
    const contraseña = document.getElementById("contr");

    if (email.value !== "" && contraseña.value !== ""){
     localStorage.setItem("loggedIn", "true");
     localStorage.setItem("userEmail", email);
    window.location.href = "index.html";
    }
})
