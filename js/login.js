function myFunction(){
    document.getElementById("botonIngreso").addEventListener("click", function(){
        let usuario = document.getElementById("usuario")
        let contraseña = document.getElementById("contr")

        if (usuario.value !== "" && contraseña.value !== ""){
            localStorage.setItem("loggedIn" , "true");
     window.location.href = "http://127.0.0.1:5500/index.html";
    }else{
            alert("Por favor, ingrese a su cuenta")

    }
    })
}
