document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    window.onload = function() {
      if (!
          localStorage.getItem("loggedIn")) {
          window.location.href = "login.html";
      }
    }
});
userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            document.getElementById('userEmail').textContent = userEmail;
        }
