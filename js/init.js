const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

const user = localStorage.getItem('user');

if (user) {
  document.getElementById('userTop').textContent = user;
}

document.getElementById("cerrarSesion").addEventListener("click", function() {
  localStorage.clear()
});

const isNightMode = localStorage.getItem('nightMode');

if (isNightMode === 'true') {
  document.body.classList.toggle('night-mode');
}


//document.addEventListener("DOMContentLoaded", function() { actualizarBadgeCarrito(); });

// function actualizarBadgeCarrito() {  const cart = JSON.parse(localStorage.getItem("cart")) || []; let totalItems = 0; cart.forEach(product => {totalItems += product.cantidad;});const cartBadge = document.querySelector(".dropdown-item.position-relative span"); if (cartBadge) {  cartBadge.textContent = totalItems;}}

//document.getElementById("vaciarCarrito").addEventListener("click", function() { actualizarBadgeCarrito();});

//document.getElementById("contCompra").addEventListener("click", function() { actualizarBadgeCarrito();});

