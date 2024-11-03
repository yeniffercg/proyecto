document.addEventListener("DOMContentLoaded", function() {
    const prodID = localStorage.getItem("prodID");
    const urlProd = `https://japceibal.github.io/emercado-api/products//${prodID}.json`;
    const urlCom = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;

    getJSONData(urlProd).then(function(resultado) {
        if (resultado.status === 'ok') {
            console.log(resultado.data);
            mostrarProducto(resultado.data);
            productosRelacionados(resultado.data.relatedProducts);

        } else {
            console.error("Error al obtener los datos:", resultado.status);
        }
    }).catch(function(error) {
        console.error("Error en la solicitud:", error);
    });

    getJSONData(urlCom).then(function(resultado) {
        if (resultado.status === 'ok') {
            const comentariosArr = resultado.data;
            console.log(comentariosArr);
            comentarios(comentariosArr);
        } else {
            console.error("Error al obtener los datos:", resultado.status);
        }
    }).catch(function(error) {
        console.error("Error en la solicitud:", error);
    });
});

function updateCartBadge () {
    const totalProducts = getTotalProducts(); 
    const badge = document.querySelector(".dropdown-item .position-absolute")
}

function mostrarProducto(p) {
    let cat = document.getElementById("category");
    let des = document.getElementById("descripcion"); 

    cat.innerHTML += `<nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
                        <ol class="breadcrumb mt-3">
                            <li class="breadcrumb-item"><a href="index.html" class="text-decoration-none text-muted">Inicio</a></li>
                            <li class="breadcrumb-item active" aria-current="page"><a href="products.html" class="text-decoration-none text-reset">${p.category}</a></li>
                        </ol>
                    </nav>`;

    imagenes(p.images);
      
    des.innerHTML += `<h1 class="fw-bold fs-1 mb-4">${p.name}</h1>
                    <p class="fs-5 mb-3">${p.description}</p>
                    <p class="fw-bold fs-2 mb-2">${p.currency} ${p.cost}</p>
                    <p class="text-muted fs-6 mb-0">${p.soldCount} productos vendidos.</p>
                    <button id="comprar" class="card-footer mt-3 py-3 px-auto 
                     border rounded border-0 fs-5">Comprar</button>`;

    document.getElementById("comprar").addEventListener("click", function() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const index = cart.findIndex( product => product.id === p.id );
        if(index >= 0) {
            cart[index].cantidad += 1;
        } else {
            guardarProductosCarrito(p);
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href="cart.html"
    });       
}            

function guardarProductosCarrito(p) {
    const producto = {
        id: p.id,
        name: p.name,
        cost: p.cost, 
        image: p.images, 
        currency: p.currency, 
        cantidad: 1}
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(producto);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function imagenes(array) {
    let carrusel = document.getElementById("imgcarrusel");
    let left = document.getElementById("imgleft");
    
    array.forEach((element) => {
        left.innerHTML += `<img src="${element}" class="w-100 my-2 rounded">`
    });
    array.forEach((element) => {
        if (element === array[0]){
            carrusel.innerHTML += `
            <div class="carousel-item active">
            <img src="${element}" class="d-block w-100 my-3 rounded" alt="">
            </div>`}
        else {
            carrusel.innerHTML += `
            <div class="carousel-item">
            <img src="${element}" class="d-block w-100 my-3 rounded" alt="">
            </div>`}
    });
}

function comentarios(array) {
    calificacionesPromedio(array, "secComent");
    calificacionesPromedio(array, "califProd");
    if(array.length == 0) {
        document.getElementById("comentarios").innerHTML += `<p class="text-muted fs-5">Aún no hay comentarios sobre este producto.</p>`
    } else {
        array.forEach((comentario) => {
            document.getElementById("comentarios").innerHTML += `
            <div class="col-sm-6 mt-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${comentario.user}
                        <span class="float-end score" data-score="${comentario.score}">${estrellas(comentario.score)}</span></h5>
                        <p class="card-text">${comentario.description}</p>
                        <p class="card-text text-muted">${comentario.dateTime}</p>
                    </div>
                </div>
            </div>`
        })
    }
}

function estrellas(score) {
    return '<span class="fa fa-star checked"></span>'.repeat(score) + '<span class="fa fa-star not-checked"></span>'.repeat(5 - score);
}

function calificacionesPromedio(array, id) {
    numCalif = array.length;
    totalCalif = 0;
    promedioCalif = 0;

    if(numCalif == 0) {
        document.getElementById(id).innerHTML += `<span class="text-muted fs-5 float-end fw-normal">Aún no hay calificaciones.</span>`
    } else {
        array.forEach((calif) => {
            totalCalif += calif.score;
        })
        promedioCalif = Math.floor(totalCalif / numCalif);

        document.getElementById(id).innerHTML += `
            ${promedioCalif} ${estrellas(promedioCalif)} <span class="text-muted">(${numCalif})</span>`
    }
}

function setProdID(id){
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function productosRelacionados(array) {
    let mostrar = document.getElementById("productosRelacionados");
    mostrar.innerHTML = "";
    array.forEach((element) => {
        mostrar.innerHTML += `
            <div onclick="setProdID(${element.id})" class="col mb-4">
                <div class="card h-100">
                    <img src="${element.image}" class="card-img-top" alt="${element.name}">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${element.name}</h5>
                    </div>
                </div>
            </div>
        `;
    });
}

document.querySelectorAll(".estrella").forEach((estrella) => {
    estrella.addEventListener("click", function() {
        const valor = parseInt(this.getAttribute("data-value"));
        const estrellasCheck = document.querySelectorAll(".estrella.checked");

        if(estrellasCheck.length > 0 && estrellasCheck[estrellasCheck.length - 1] === this) {
            document.querySelectorAll(".estrella").forEach((s, index) => {
                s.classList.remove("checked");
            });
        } else {
            document.querySelectorAll(".estrella").forEach((s) => {
                s.classList.remove("checked");
            });
            document.querySelectorAll(".estrella").forEach((s, index) => {
                if (index < valor) {
                    s.classList.add("checked");
                }
            });
        }
    });
});

document.getElementById("enviar").addEventListener("click", function() {
    comBox = document.getElementById("comentarioBox").value;
    alert = document.getElementById("alertaCom");
    if(comBox !== '') {
        alert.style.display = "none";
        let nuevoComentario = {
            user: localStorage.getItem('user'),
            score: contarEstrellasSeleccionadas(),
            description: document.getElementById("comentarioBox").value,
            dateTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
            };
            agregarComentario(nuevoComentario);
            recalcularPromedio(nuevoComentario.score);
    } else {
        alert.style.display = "block";
    }
});

function contarEstrellasSeleccionadas() {
    return document.querySelectorAll(".estrella.checked").length;
}

function agregarComentario(comentario) {
    document.getElementById("comentarios").innerHTML += `
    <div class="col-sm-6 mt-4">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${comentario.user}
                <span class="float-end score" data-score="${comentario.score}">${estrellas(comentario.score)}</span></h5>
                <p class="card-text">${comentario.description}</p>
                <p class="card-text text-muted">${comentario.dateTime}</p>
            </div>
        </div>
    </div>`;
}

function recalcularPromedio(nuevaCalif) {
    let totalCalif = nuevaCalif;
    let numCalif = 0;

    document.querySelectorAll(".score").forEach((element) => {
        const scoreText = element.getAttribute('data-score');
        if (scoreText) {
            totalCalif += parseInt(scoreText);
            numCalif++;
        }
    });
    let nuevoPromedio = Math.floor(totalCalif / numCalif);
    document.getElementById("secComent").innerHTML = `
        ${nuevoPromedio} ${estrellas(nuevoPromedio)} <span class="text-muted">(${numCalif})</span>`;
    document.getElementById("califProd").innerHTML = `
        ${nuevoPromedio} ${estrellas(nuevoPromedio)} <span class="text-muted">(${numCalif})</span>`;
}




