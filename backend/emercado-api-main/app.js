const express = require('express');
const app = express(); 
const port = 3000; 

// app.use(express.json());

// const cart = require('./cart/buy.json'); 
// app.get( '/cart' , (req, res) => {
//     res.send (res.json);
// }); 
// app.listen(port, () => {
//     console.log(`servidor corriendo en http://localhost:${port}`);
// })

const cart = 'backend/emercado-api-main/cart/buy.json';
getJSONData(cart).then(function(resultado) {
    if (resultado.status === 'ok') {
        console.log(resultado.data);
    } else {
        console.error("Error al obtener los datos:", resultado.status);
    }
}).catch(function(error) {
    console.error("Error en la solicitud:", error);
});