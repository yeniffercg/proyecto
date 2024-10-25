if (user) {
  document.getElementById('userProfile').setAttribute("value", user);
  document.getElementById('arrobaName').textContent = user;
}

const userData = JSON.parse(localStorage.getItem('userData'));
const name2 = document.getElementById('name2');
const lastName = document.getElementById('lastName1');
const lastName2 = document.getElementById('lastName2');
const email = document.getElementById('email');
const tel = document.getElementById('tel');

if(userData) {
    const name = document.getElementById('name1');
    document.getElementById('arrobaName').textContent = userData[0].name + ' ' + userData[0].lastName;
    document.getElementById('arroba').textContent = userData[0].email;
    name.value = userData[0].name;
    lastName.value = userData[0].lastName;
    email.value = userData[0].email;
  if (userData.length == 2) {
    if (userData[1].name2) {
      name2.value = userData[1].name2;
    }
    if (userData[1].lastName2) {
      lastName2.value = userData[1].lastName2;
    }
    if (userData[1].tel) {
      tel.value = userData[1].tel;
    }
  }
}

document.getElementById('botonGuardar').addEventListener('click', function() {

  const name = document.getElementById('name1');
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

  if (email.value && !email.value.includes('@')) {
    email.classList.remove('valid');
    email.classList.add('invalid');
    isValid = false;
  } 

  if (isValid) {
    const requiredData = { name: name.value, lastName: lastName.value, email: email.value };
    const optionalData = {};
    const data = [requiredData, optionalData];
    [name2, lastName2, tel].forEach(field => {
      if (field.value) {
        optionalData[field.name] = field.value;
      }
    });
    console.log(data);
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

darkMode.addEventListener('click', () => {
  const nightModeActivated = darkMode.checked;
  document.body.classList.toggle('night-mode', nightModeActivated);
  localStorage.setItem('nightMode', nightModeActivated);
});

