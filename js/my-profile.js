if (user) {
  document.getElementById('userProfile').setAttribute("value", user);
  document.getElementById('arrobaName').textContent = user;
} else {}

const userData = JSON.parse(localStorage.getItem('userData'));
if (userData) {
  document.getElementById('arrobaName').textContent = userData.name + userData.lastName;
  document.getElementById('arroba').textContent = userData.email;
} else {}

document.getElementById('botonGuardar').addEventListener('click', function() {
  const name = document.getElementById('name1');
  const lastName = document.getElementById('lastName1');
  const email = document.getElementById('email');
  const userProfile = document.getElementById('userProfile');

  let isValid = true;

  [name, lastName, email, userProfile].forEach(field => {
    if (!field.value) {
      field.classList.remove('valid');
      field.classList.add('invalid');
      isValid = false;
    } else {
      field.classList.remove('invalid');
      field.classList.add('valid');
    }
  });

  if(userProfile.value && userProfile.value !== user) {
    localStorage.setItem("user", userProfile.value);
  }

  if (email.value && !email.value.includes('@')) {
    email.classList.remove('valid');
    email.classList.add('invalid');
    isValid = false;
  } 

  if (isValid) {
    const data = { name: name.value, lastName: lastName.value, email: email.value };
    localStorage.setItem('userData', JSON.stringify(data));
    console.log(localStorage.getItem('userData'));
    document.getElementById('arrobaName').textContent = `${name.value} ${lastName.value}`;
    document.getElementById('arroba').textContent = email.value;
    document.getElementById('userTop').textContent = userProfile.value;
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
const dwMenu = document.getElementById('dwMenu');
const darkMode = document.getElementById('flexSwitchCheckDefault');
const isNightMode = localStorage.getItem('nightMode');

if (isNightMode === 'true') {
  dwMenu.classList.add('night-mode');
  theme.classList.add('night-mode');
  document.body.classList.add('night-mode');
  darkMode.checked = true;
}

darkMode.addEventListener('click', () => {
  const nightModeActivated = darkMode.checked;
  dwMenu.classList.toggle('night-mode', nightModeActivated);
  theme.classList.toggle('night-mode', nightModeActivated);
  document.body.classList.toggle('night-mode', nightModeActivated);
  localStorage.setItem('nightMode', nightModeActivated);
});

