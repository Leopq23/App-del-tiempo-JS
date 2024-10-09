require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const apikey = process.env.API_KEY;
const urlBase = 'https://api.openweathermap.org/data/2.5/weather';

// Permitir solicitudes desde el frontend
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Endpoint para obtener el clima
app.get('/clima/:ciudad', async (req, res) => {
  const ciudad = req.params.ciudad;
  try {
    const response = await axios.get(`${urlBase}?q=${ciudad}&appid=${apikey}`);
    res.json(response.data);  // Enviar datos del clima al frontend
  } catch (error) {
    res.status(500).send('Error al obtener los datos del clima');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
