const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('pg');  // Usamos el cliente de PostgreSQL

const app = express();
const port = 5000;

// Configuración de CORS y parsing de JSON
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión con PostgreSQL
const client = new Client({
    user: 'root',
    host: '176.52.134.226',
    database: 'postgres',
    password: 'Ecodrone#',
    port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conexión exitosa a PostgreSQL!');
});

// Ruta de prueba para el backend
app.get('/', (req, res) => {
  res.send('Hola desde el servidor!');
});

// Ruta para registrar un usuario
app.post('/users', async (req, res) => {
    const { name, email, password, phoneNumber, latitude, longitude } = req.body;
    try {
      const result = await client.query(
        'INSERT INTO users (name, email, password, phoneNumber, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, email, password, phoneNumber, latitude, longitude]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al registrar usuario');
    }
  });

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
