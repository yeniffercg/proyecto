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

const theme = document.getElementById('tema');
const darkMode = document.getElementById('flexSwitchCheckDefault');
const isNightMode = localStorage.getItem('nightMode');

    if (isNightMode === 'true') {
        theme.classList.add('night-mode');
        darkMode.checked = true;
    }

    darkMode.addEventListener('click', () => {
        const nightModeActivated = darkMode.checked;
        theme.classList.toggle('night-mode', nightModeActivated);
        localStorage.setItem('nightMode', nightModeActivated);
});