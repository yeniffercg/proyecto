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