document.addEventListener("DOMContentLoaded", function() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const list = document.getElementById("product-list");
    const resumeList = document.getElementById("resume-list");

    if (!cart || cart.length == 0){
        carritoVacio()
    } else {
        cantidadCarrito();
        cart.forEach((product, index) => {
            //Recorre el carrito y agrega cada producto a la lista de compra
            list.innerHTML += `
                <div class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-4">
                            <img src="${product.image[0]}" alt="${product.name}" class="img-thumbnail">
                        </div>
                        <div class="col d-flex justify-content-between flex-column me-2 py-2">
                            <div onclick="setProdID(${product.id})" class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${product.name}</h4>
                                <h4>${product.currency} ${product.cost}</h4>
                            </div>
                            <div class="d-inline d-flex justify-content-between">
                                <div id="cant" class="d-inline divCantidad rounded-pill border">
                                    <button onclick="actualizarCantidad(${index}, -1)" class="btnCantidad ps-3">
                                        <i class="fas fa-minus"></i>
                                    </button>                                    
                                    <input type="number" id="input-cantidad-${index}" min="1" max="100" name="quantity"
                                     value="${product.cantidad}" readonly class="form-control text-center d-inline
                                     inputCantidad bg-transparent">
                                    <button onclick="actualizarCantidad(${index}, 1)" class="btnCantidad pe-3">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <svg onclick="removeItem(${product.id})" xmlns="http://www.w3.org/2000/svg" width="25" 
                                height="30" fill="currentColor" class="bi bi-trash3 mb-1" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0
                                    0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 
                                    4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846
                                    10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1
                                    .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1
                                    .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1
                                    .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>`;
            //Suma cada producto y su cantidad al resumen de la compra
            resumeList.innerHTML += `
                <h5 class="fw-normal my-3">${product.name} (<span id="cantidadResume${index}">${product.cantidad}</span>)
                <span class="float-end" id="subtotal-${index}">
                 ${product.currency} ${(product.cost * product.cantidad)}</span></h5>`;
            calcularSubtotal(cart, index);
            actualizarBadgeCarrito();
            calcularEnvio();
        });
    }
});

//Redirige a la página del producto al que le des click
function setProdID(id){
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

//Edita el subtitulo de la página según las cantidad de productos en el carrito
function cantidadCarrito(){
    miCarrito = document.getElementById("miCarrito");
    cart = JSON.parse(localStorage.getItem('cart'));
    if (cart || cart.length !== 0){
        let items = 0;
        cart.forEach((product) => {
            items += product.cantidad;
        });
        if(items > 1) {
            miCarrito.innerHTML = `
            <h4 class="mb-4"> Mi carrito (<span id="cantidadCarrito">${items}</span> productos)</h4>`;
        } else {
            miCarrito.innerHTML = `
            <h4 class="mb-4"> Mi carrito (<span id="cantidadCarrito">${items}</span> producto)</h4>`;
        }
    }
}

//Elimina un producto del carrito y recarga la página
function removeItem(id){
    const cart = JSON.parse(localStorage.getItem('cart'));
    const index = cart.findIndex( product => product.id === id );
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

//Calcula el subtotal en el resumen de la compra con el cambio de moneda
function calcularSubtotal(cart, index){
    cart = JSON.parse(localStorage.getItem('cart'));
    subtotal = document.getElementById("subtotal");
    subtotalUSD = document.getElementById("subtotalUSD");
    USD = (product) => (product).currency == "USD";
    UYU = (product) => (product).currency == "UYU";
    cantidad = cart[index].cantidad;
    total = 0;
    
    if(cart.every(USD) || cart.every(UYU)){
        cart.forEach((product) => {
            total += product.cost * cantidad;
            subtotal.innerHTML = `${product.currency}` + ' ' + total;
        });
    }else{
        const productsUSD = cart.filter(USD);
        const productsUYU = cart.filter(UYU);
        totalUSD = 0;
        totalUYU = 0;
        productsUSD.forEach((product) => {
            totalUYU += product.cost * 41 * product.cantidad;
            totalUSD += product.cost * product.cantidad;
        });
        productsUYU.forEach((product) => {
            totalUYU += product.cost * product.cantidad;
            totalUSD += Math.floor(product.cost / 41) * product.cantidad;
        });
        subtotal.innerHTML = 'UYU ' + totalUYU;
        subtotalUSD.innerHTML = 'USD ' + totalUSD;
    } 
}

//Actualiza la cantidad mostrada en el item de la lista al sumar o restar productos
function actualizarCantidad(index, cambio) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart[index].cantidad = Math.max(1, cart[index].cantidad + cambio);

    const cantidadInput = document.getElementById(`input-cantidad-${index}`);
    cantidadInput.value = cart[index].cantidad;

    const nuevoSubtotal = (cart[index].currency + ' ' + cart[index].cost * cart[index].cantidad);
    document.getElementById(`subtotal-${index}`).textContent = nuevoSubtotal;
    document.getElementById(`cantidadResume${index}`).textContent = cantidadInput.value;
    
    localStorage.setItem('cart', JSON.stringify(cart));
    cantidadCarrito();
    calcularSubtotal(cart, index);
    actualizarBadgeCarrito();
}

//Escucha el click al botón Continuar comprando y redirige a Categorías.
document.getElementById("contCompra").addEventListener("click", function() {
    window.location.href = "categories.html";
});

//Muestra una alerta y un botón para comenzar a comprar. Esconde la lista de productos comprados y el resumen del pedido
function carritoVacio() {
    const list = document.getElementById("product-list");
    resume = document.getElementById("resume");
    miCarrito = document.getElementById("miCarrito");
    resume.style.display = "none";
    miCarrito.style.display = "none";
    list.innerHTML = "";
    list.innerHTML += `
        <div class="container">
            <div class="alert text-center" role="alert">
                <h4 class="alert-heading">Aún no tienes productos en el carrito.</h4>
            </div>
            <div class="d-md-flex justify-content-md-center">
                <a href="categories.html"><button class="mt-3 py-3 px-4 border rounded border-0 fs-5"
                 id="comCompra">Comenzar a comprar</button></a>
            </div>
        </div>`;
    console.error ("No hay elementos en el local storage!");
}

//Elimina los elementos del localStorage, llama a carritoVacio() y actualiza el badge
document.getElementById("vaciarCarrito").addEventListener("click",function() {
    localStorage.removeItem("cart");
    carritoVacio();
    actualizarBadgeCarrito();
})

//Calcula el costo de envio segun el tipo de envio seleccionado
function calcularEnvio() {
    envioPremium = document.getElementById("premium");
    envioExpress = document.getElementById("express");
    envioStandard = document.getElementById("standard");
    subtotalElement = document.getElementById("subtotal");
    precioTotal = document.getElementById("total");
    const subtotalModal = document.getElementById("subtotalModal");
    const envioModal = document.getElementById("envioModal");

    costoEnvio = 0;
    subtotal = parseFloat(subtotalElement.textContent.replace(/[^\d.-]/g, ''));
    
    if(envioPremium && envioPremium.checked){
        costoEnvio = subtotal * 0.15;
    }
    if(envioExpress && envioExpress.checked){
        costoEnvio = subtotal * 0.07;
    }
    if(envioStandard && envioStandard.checked){
        costoEnvio = subtotal * 0.05;
    }
  
    total = subtotal + costoEnvio;
    precioTotal.innerHTML = `$${total.toFixed(2)}`;

    subtotalModal.innerHTML = `$${subtotal.toFixed(2)}`;
    envioModal.innerHTML = `$${costoEnvio.toFixed(2)}`;

}

//Calcula envio cuando el modal esta abierto
document.getElementById("comprarModal2").addEventListener("show.bs.modal", function(){
    calcularEnvio();

});

// Actualizar el total cuando se cambie el tipo de envío
document.querySelectorAll('input[name="envio"]').forEach(function(element) {
    element.addEventListener("change", function() {
        calcularEnvio();
    });
});

//Muestra el formulario para los datos de tarjeta y oculta los datos de transferencia
function mostrarTarjeta(){
    document.getElementById("form-tarjeta").style.display = "block";
    document.getElementById("datosTransferencia").style.display = "none";
}

function mostrarTransferencia() {
    document.getElementById("form-tarjeta").style.display = "none"; 
    document.getElementById("datosTransferencia").classList.remove("d-none");
    document.getElementById("datosTransferencia").style.display = "block";
}


//Valida los campos al presionar continuar y cambia al siguiente modal
document.getElementById("continuarBtn").addEventListener("click", function () {
    const metodoPago = document.querySelector('input[name="metodoPago"]:checked');
    let isValid = false;

    // Verificamos si se detectó el método de pago
    console.log("Método de pago seleccionado:", metodoPago ? metodoPago.value : "ninguno");

    // Función para validar un grupo de campos
    const validateFields = (fields) => {
        let isValid = true;

        fields.forEach((field) => {
            if (!field.value) {
                field.classList.add("invalid");
                isValid = false;
                console.log("Campo inválido:", field.id);  // Imprimimos el campo inválido
            } else {
                field.classList.remove("invalid");
            }
        });

        return isValid;
    };

    // Validar según el método de pago seleccionado
    if (metodoPago) {
        if (metodoPago.value === "tarjetaCredito") {
            // Campos para tarjeta de crédito
            const fields = [
                document.getElementById('name-compra'),
                document.getElementById('last-name-compra'),
                document.getElementById('ci'),
                document.getElementById('num-tarjeta'),
                document.getElementById('codigo-seguridad'),
                document.getElementById('vencimiento'),
            ];
            
            // Validaciones específicas para tarjeta de crédito
            const ci = document.getElementById('ci');
            const numTarjeta = document.getElementById('num-tarjeta');
            const vencimiento = document.getElementById('vencimiento');
            const codigoSeguridad = document.getElementById('codigo-seguridad');
    
            if (ci && !/^\d{7,8}$/.test(ci.value)) {
                ci.classList.add("invalid");
                isValid = false;
                console.log("CI inválido");
            }
    
            if (numTarjeta && !/^\d{16}$/.test(numTarjeta.value)) {
                numTarjeta.classList.add("invalid");
                isValid = false;
                console.log("Número de tarjeta inválido");
            }
    
            if (vencimiento && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento.value)) {
                vencimiento.classList.add("invalid");
                isValid = false;
                console.log("Vencimiento inválido");
            }
    
            if (codigoSeguridad && !/^\d{3}$/.test(codigoSeguridad.value)) {
                codigoSeguridad.classList.add("invalid");
                isValid = false;
                console.log("Código de seguridad inválido");
            }

            isValid = validateFields(fields);
    
        } else if (metodoPago.value === "transferenciaBancaria") {
            // Campos para transferencia bancaria
            const fields = [
                document.getElementById('beneficiario'),
                document.getElementById('entidadFinanciera'),
                document.getElementById('cuentaBancaria'),
                document.getElementById('codigoSwift'),
                document.getElementById('monto'),
                document.getElementById('concepto'),
            ];

            // Depuramos los campos de transferencia para ver si se están pasando correctamente
            fields.forEach(field => console.log("Campo de transferencia:", field.id, "Valor:", field.value));

            isValid = validateFields(fields);
        }
    }

    // Mostrar modal si es válido
    if (isValid) {
        const comprarModal = new bootstrap.Modal(document.getElementById("comprarModal"));
        const comprarModal2 = new bootstrap.Modal(document.getElementById("comprarModal2"));
        comprarModal.hide();
        comprarModal2.show();
    } else {
        let alert = document.getElementById("alertaModal");
        let alert2 = document.getElementById("alertaModal2");
        alert.style.display = "block";
        alert2.style.display = "block";
    }
});


//Valida los campos al presionar finalizar compra y muestra un mensaje de éxito si todo es válido
document.getElementById("finCompra").addEventListener('click', function() {
    const departamento = document.getElementById('departamento');
    const localidad = document.getElementById('localidad');
    const calle = document.getElementById('calle');
    const numeroPuerta = document.getElementById('numero-puerta');
    const esquina = document.getElementById('esquina');
  
    let isValid = true;
  
    [departamento, localidad, calle, numeroPuerta, esquina].forEach(field => {
       if (!field.value) {
        field.classList.remove('valid');
        field.classList.add('invalid');
        isValid = false;
      } else {
        field.classList.remove('invalid');
        field.classList.add('valid');
      }
    });
  
    if (isValid) {
        document.getElementById("finCompra").setAttribute("data-bs-dismiss", "modal");
        document.getElementById("finCompra").click(function(){
            document.getElementById("comprarModal2").modal("hide");
          });
        swal("Compra finalizada", "Haz finalizado con éxito tu compra, que lo disfrutes!", "success");     
    }
});

//Actualiza el badge al vaciar el carrito y al continuar comprando
document.getElementById("vaciarCarrito").addEventListener("click", function() { 
  actualizarBadgeCarrito();
});

document.getElementById("contCompra").addEventListener("click", function() { 
  actualizarBadgeCarrito();
});


