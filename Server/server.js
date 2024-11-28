const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
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
  const { name, email, password, phoneNumber, latitude, longitude, lastname, address } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10); // Encriptar la contraseña antes de guardarla

    const result = await client.query(
      'INSERT INTO users (name, email, password, phoneNumber, latitude, longitude, lastname, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, email, hashedPassword, phoneNumber, latitude, longitude, lastname, address]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al registrar usuario');
  }
});

// Ruta para obtener todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los usuarios');
  }
});

// Ruta para login de usuario
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe en la base de datos
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(400).send('Usuario no encontrado');
    }

    const user = result.rows[0];
    
    // Comparar la contraseña proporcionada con la almacenada (cifrada)
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).send('Contraseña incorrecta');
    }

    // Si las credenciales son correctas, enviar los datos del usuario
    res.json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        latitude: user.latitude,
        longitude: user.longitude,
        lastname: user.lastname,
        address: user.address
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al iniciar sesión');
  }
});

// Ruta para obtener todas las alertas
app.get('/alerts', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM alert');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener las alertas');
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
