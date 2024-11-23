const express = require('express');
const app = express(); 
const port = 3000; 

app.use(express.json());

const cart = require('./son'); 

app.get(/cart',(req, res) => {
    res.send (cart);
}); 

//iniciar el servidor 
app.listen(port, () => {
    console.log(`servidor corriendo en http://localhost:${port}`);
})



