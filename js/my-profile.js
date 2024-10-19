if (user) {
    document.getElementById('userProfile').setAttribute("value", user)
  }

document.getElementById('botonGuardar').addEventListener('click', function(){

 const name = document.getElementById('name1');
 const lastName = document.getElementById('lastName1');

  if(name.value =="" || lastName.value ==""){
    alert('Debe llenar los campos obligatorios para continuar!');
  } else{

  } if (name.value || lastName.value) {
 const data = {name, lastName}
 localStorage.setItem('userData', JSON.stringify(data))
    alert('Datos guardados con exito!')
  }
})


document.addEventListener("DOMContentLoaded", function () {
  const imageInput = document.getElementById("imageUpload");
  const profileImage = document.getElementById("profileImage");

  const imagenGuardada = localStorage.getItem("profileImage");
  if (imagenGuardada) {
    profileImage.src = imagenGuardada;
} else {
  profileImage.src = "img/img_perfil.png";
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

const theme = document.getElementById('tema');
const darkMode = document.getElementById('flexSwitchCheckDefault');
const isNightMode = localStorage.getItem('nightMode');

    if (isNightMode === 'true') {
        theme.classList.add('night-mode');
        document.body.classList.add('night-mode');
        darkMode.checked = true;
    }

    darkMode.addEventListener('click', () => {
        const nightModeActivated = darkMode.checked;
        theme.classList.toggle('night-mode', nightModeActivated);
        document.body.classList.toggle('night-mode', nightModeActivated);
        localStorage.setItem('nightMode', nightModeActivated);
});

