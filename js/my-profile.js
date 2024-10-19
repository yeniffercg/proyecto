/*  Codigo de Emilia
if (user) {
    document.getElementById('userProfile').setAttribute("value", user)
  }

document.getElementById('botonGuardar').addEventListener('click', function(){

 const name = document.getElementById('name1').value;
 const lastName = document.getElementById('lastName1').value;
 const email = document.getElementById('email').value;

  if(!name || !lastName || !email){
    alert('Debe llenar los campos obligatorios para continuar!');
  } else {
    alert('datos guardados con exitooo');
  }
  const data = {name, lastName}
  localStorage.setItem('userData', JSON.stringify(data))
})*/

if (user) {
  document.getElementById('userProfile').setAttribute("value", user);
}

document.getElementById('botonGuardar').addEventListener('click', function() {
  const name = document.getElementById('name1');
  const lastName = document.getElementById('lastName1');
  const email = document.getElementById('email');

  let isValid = true;

  // Validar y aplicar estilos
  [name, lastName, email].forEach(field => {
    if (!field.value) {
      field.classList.remove('valid');
      field.classList.add('invalid');
      isValid = false;
    } else {
      field.classList.remove('invalid');
      field.classList.add('valid');
    }
  });

  
  if (email.value && !email.value.includes('@')) {
    email.classList.remove('valid');
    email.classList.add('invalid');
    isValid = false;
  }

  if (!isValid) {
    const data = { name: name.value, lastName: lastName.value };
    localStorage.setItem('userData', JSON.stringify(data));
  }
});

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

