document.addEventListener("DOMContentLoaded", function() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const list = document.getElementById("product-list");
    const resumeList = document.getElementById("resume-list");

    if (!cart || cart.length == 0){
        carritoVacio()
    } else {
        cantidadCarrito();
        cart.forEach((product, index) => {
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
            resumeList.innerHTML += `
                <h5 class="fw-normal my-3">${product.name} (<span id="cantidadResume${index}">${product.cantidad}</span>)
                <span class="float-end" id="subtotal-${index}">
                 ${product.currency} ${(product.cost * product.cantidad)}</span></h5>`;
            calcularSubtotal(cart, index);
        });
    }
});

function setProdID(id){
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

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

function removeItem(id){
    const cart = JSON.parse(localStorage.getItem('cart'));
    const index = cart.findIndex( product => product.id === id );
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

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
}

document.getElementById("contCompra").addEventListener("click", function() {
    window.location.href = "categories.html";
});


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

document.getElementById("vaciarCarrito").addEventListener("click",function() {
    localStorage.removeItem("cart");
    carritoVacio();
})

//Calcula el costo de envio segun
function calcularEnvio() {
    envioPremium = document.getElementById("premium");
    envioExpress = document.getElementById("express");
    envioStandard = document.getElementById("standard");
    subtotalElement = document.getElementById("subtotal")
    precioTotal = document.getElementById("total");

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
    precioTotal.innerHTML = `$${total.toFixed(2)}`

}

    //Calcula envio al cargar pagina
document.addEventListener("DOMContentLoaded", function(){
    calcularEnvio();

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

});

//Muestra alerta al finalizar compra
document.getElementById("finCompra").addEventListener("click", function() {
    swal("Compra finalizada", "Haz finalizado con éxito tu compra, que lo disfrutes!", "success");
});


// document.addEventListener("DOMContentLoaded", function() { actualizarBadgeCarrito(); });

// function actualizarBadgeCarrito() {  const cart = JSON.parse(localStorage.getItem("cart")) || []; let totalItems = 0; cart.forEach(product => {totalItems += product.cantidad;});const cartBadge = document.querySelector(".dropdown-item.position-relative span"); if (cartBadge) {  cartBadge.textContent = totalItems;}}

//document.getElementById("vaciarCarrito").addEventListener("click", function() { actualizarBadgeCarrito();});

//document.getElementById("contCompra").addEventListener("click", function() { actualizarBadgeCarrito();});

//function actualizarCantidad(index, cambio) { const cart = JSON.parse(localStorage.getItem("cart"));cart[index].cantidad = Math.max(1, cart[index].cantidad + cambio);     localStorage.setItem("cart", JSON.stringify(cart)); actualizarBadgeCarrito();   }
// window.addEventListener("storage", function(event) { if (event.key === "cart") { actualizarBadgeCarrito(); } });

// document.getElementById("finCompra").addEventListener("submit", function() {
//     const departamento = document.getElementbyId('departamento').value;
//     const localidad = document.getElementbyId('localidad').value;
//     const calle = document.getElementbyId('calle').value; 
//     const puerta = document.getElementbyId('num-puerta').value;

//    if (!departamento || !localidad || !calle || !puerta) 