document.addEventListener("DOMContentLoaded", function() {
    const prodID = localStorage.getItem("prodID");
    const urlProd = `https://japceibal.github.io/emercado-api/products//${prodID}.json`;
    const urlCom = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;

    getJSONData(urlProd).then(function(resultado) {
        if (resultado.status === 'ok') {
            console.log(resultado.data);
            mostrarProducto(resultado.data);
        } else {
            console.error("Error al obtener los datos:", resultado.status);
        }
    }).catch(function(error) {
        console.error("Error en la solicitud:", error);
    });

    getJSONData(urlCom).then(function(resultado) {
        if (resultado.status === 'ok') {
            console.log(resultado.data);
            comentarios(resultado.data);
        } else {
            console.error("Error al obtener los datos:", resultado.status);
        }
    }).catch(function(error) {
        console.error("Error en la solicitud:", error);
    });
});

function mostrarProducto(p) {
    let cat = document.getElementById("category");
    let des = document.getElementById("descripcion");

    cat.innerHTML += `<nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="index.html" class="ms-2 text-decoration-none">Inicio</a></li>
                            <li class="breadcrumb-item active" aria-current="page"><a href="products.html" class="text-decoration-none">${p.category}</a></li>
                        </ol>
                    </nav>`;

    imagenes(p.images);

    des.innerHTML += `<h1 class="fw-bold fs-1 mb-4">${p.name}</h1>
                    <p class="fs-5 mb-4">${p.description}</p>
                    <p class="fw-bold fs-2 mb-5">${p.currency} ${p.cost}</p>
                    <p class="text-muted fs-6">${p.soldCount} productos vendidos.</p>`
}

function imagenes(array) {
    let carrusel = document.getElementById("imgcarrusel");
    let left = document.getElementById("imgleft");
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
    array.forEach((element) => {
        left.innerHTML += `<img src="${element}" class="w-100 my-2 rounded">`
    });
}

function comentarios(array) {
    if(array.length == 0) {
        document.getElementById("comentarios").innerHTML += `<p class="text-muted fs-5">Aún no hay comentarios sobre este producto.</p>`
    } else {
        array.forEach((comentario) => {
            document.getElementById("comentarios").innerHTML += `
            <div class="col-sm-6 mt-4">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${comentario.user}
                    <span class="float-end">${estrellas(comentario.score)}</span></h5>
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