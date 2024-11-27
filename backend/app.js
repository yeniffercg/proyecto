const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor corriendo correctamente');
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const fs = require('fs');
const path = require('path');

// Ruta para obtener un archivo JSON específico
app.get('/api/json1', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'archivo1.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.json(jsonData);
});

app.get('/api/json2', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'archivo2.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.json(jsonData);
});