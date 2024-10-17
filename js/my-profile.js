if (user) {
    document.getElementById('userProfile').setAttribute("value", user)
  }

document.getElementById('botonGuardar').addEventListener('click', function(){

 const name = document.getElementById('name1');
 const lastName = document.getElementById('lastName1');

  if(!name || !lastName){
    alert('Debe llenar los campos obligatorios para continuar!');
  }
 const data = {name, lastName}
 localStorage.setItem('userData', JSON.stringify(data))
    alert('datos guardados con exitooo')

})

document.addEventListener("DOMContentLoaded", function () {
  const imageInput = document.getElementById("imageUpload");
  const profileImage = document.getElementById("profileImage");

  const imagenGuardada = localStorage.getItem("profileImage");
  if (imagenGuardada) {
    profileImage.src = imagenGuardada;
}

imageInput.addEventListener("change", function (event) {
    const lector = new FileReader();
    lector.onload = function () {
        profileImage.src = lector.result;
        localStorage.setItem("profileImage", lector.result);
    };
    lector.readAsDataURL(event.target.files[0]);
  });

const usuarioAlmacenado = localStorage.getItem("username");
 if (usuarioAlmacenado) {
    document.getElementById("userProfile").setAttribute("value", usuarioAlmacenado);
 }
});
