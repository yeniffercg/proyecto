document.addEventListener("DOMContentLoaded", function() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const list = document.getElementById("product-list");
    const resumeList = document.getElementById("resume-list");

    if (!cart || cart.length == 0){
        resume = document.getElementById("resume");
        resume.style.display = "none";
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
        console.error ("No hay elementos en el local storage!")
    } else {
        console.log(cart);
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
                            <div class="d-inline">
                                <div id="cant" class="d-inline">
                                    <button onclick="actualizarCantidad(${index}, -1)">-</button>                                    
                                    <input type="number" id="input-cantidad-${index}" min="1" max="100" name="quantity"
                                    value="${product.cantidad}" readonly>
                                    <button onclick="actualizarCantidad(${index}, 1)">+</button>
                                </div>
                                <svg onclick="removeItem(${product.id})" xmlns="http://www.w3.org/2000/svg" width="25" 
                                height="30" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
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
                <h5 class="fw-normal my-3">${product.name}<span class="float-end" id="subtotal-${index}">
                 ${product.currency} ${(product.cost * product.cantidad)}</span></h5>`;
        });
        calcularSubtotal(cart);
        // actualizarSubtotal(cart);
    }
});

function setProdID(id){
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

//Funcionalidad de trash
function removeItem(id){
    const cart = JSON.parse(localStorage.getItem('cart'));
    const index = cart.findIndex( product => product.id === id );
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

// //Actualiza precio segun cantidad
// document.addEventListener("DOMContentLoaded", function(){
//     valorInicial = document.getElementById("cantidad");
//     btnSumar = document.getElementById("sumar")
//     btnRestar = document.getElementById("restar")
//     // cantidad = Number(valorInicial.value);

//     actualizarSubtotal = () => {
//         calcularSubtotal(cart)
//     }

//     btnSumar.addEventListener('click', function (){
//         cantidad ++;
//         valorInicial.value = cantidad;
//         actualizarSubtotal();

//     });
//     btnRestar.addEventListener('click', function (){
//         if (cantidad > 0) {
//             cantidad --;
//             valorInicial.value = cantidad;
//             actualizarSubtotal();
//         }
//    })
// }); https://meet27.webex.com/meet/pr27996126197



function calcularSubtotal(cart){
    subtotal = document.getElementById("subtotal");
    subtotalUSD = document.getElementById("subtotalUSD");
    USD = (product) => (product).currency == "USD";
    UYU = (product) => (product).currency == "UYU";
    cantidad = cart[index].product.cantidad;
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
            totalUYU += product.cost * 41 * product;
            totalUSD += product.cost * product.cantidad;
        });
        productsUYU.forEach((product) => {
            totalUYU += product.cost * product.cantidad;
            totalUSD += Math.floor(product.cost / 41) * product.cantidad;
        });
        subtotal.innerHTML = 'UYU ' + totalUSD;
        subtotalUSD.innerHTML = 'USD ' + totalUSD;

        //actualizarSubtotal(cart);
    } 
}

// guardar nueva cantidad en el local
// // boton vaciar carrito

//    function actualizarSubtotal(cart){
//       const cantidades = document.getElementById("cantidad");
//       cantidades.addEventListener("input", function(e) {
//          cantidad = e.target.value;
//          cart => (product).cantidad == cantidad;
//      });
//  }

 function actualizarCantidad(index, cambio) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart[index].cantidad = Math.max(1, cart[index].cantidad + cambio);

    const cantidadInput = document.getElementById(`input-cantidad-${index}`);
    cantidadInput.value = cart[index].cantidad;

    const nuevoSubtotal = (cart[index].currency + ' ' + cart[index].cost * cart[index].cantidad);
    document.getElementById(`subtotal-${index}`).textContent = nuevoSubtotal;
   
    localStorage.setItem('cart', JSON.stringify(cart));

    calcularSubtotal(cart);
    // actualizarResumen(cart);
}

// function actualizarTotales() {

//     let unidades = 0;
//     let precio = 0;

//     if (products.length > 0) {
//         products.forEach(producto => {
//             unidades += producto.quantity;
//             precio += producto.cost * producto.quantity;
//         });
//     }

//     const unidadesElement = document.getElementById("unidades");
//     const precioElement = document.getElementById("precio");
//     const cartCountElement = document.getElementById("cart-count");

//     if (unidadesElement && precioElement) {
//         unidadesElement.innerText = unidades;
//         precioElement.innerText = precio;
//     }

//     // Actualiza el badge del carrito
//     if (cartCountElement) {
//         cartCountElement.innerText = unidades;
//         if (unidades === 0) {
//             cartCountElement.style.display = "none";
//          } else { 
//             cartCountElement.style.display = "inline-block";
//          }
//     }
// }


document.getElementById("contCompra").addEventListener("click", function() {
    window.location.href = "categories.html";
});

//document.getElementById("finCompra").addEventListener("click", function() {});

