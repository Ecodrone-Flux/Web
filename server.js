require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const CryptoJS = require('crypto-js');
const { Client } = require('pg');

const app = express();
const port = 5000;

// Clave secreta para cifrado
const SECRET_KEY = process.env.SECRET_KEY;

const allowedOrigins = [
  'http://localhost:3000',    // Para desarrollo
  'http://182.160.27.106'     // Para producción
];

app.use(cors({
  origin: (origin, callback) => {
    console.log('Request Origin:', origin);
    if (!origin) return callback(null, true); // Permitir herramientas como Postman
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS not allowed for origin: ${origin}`));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

// Configuración de la conexión con PostgreSQL
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
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

// Configuración para servir archivos estáticos desde el build de React
app.use(express.static(path.join(__dirname, 'build')));

// Ruta para registrar un usuario
app.post('/users', async (req, res) => {
  const { name, email, password, phoneNumber, latitude, longitude, lastname, address } = req.body;

  try {
    // Cifrar la contraseña antes de guardarla
    const hashedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();

    const result = await client.query(
      'INSERT INTO users (name, email, password, phoneNumber, latitude, longitude, lastname, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, email, hashedPassword, phoneNumber, latitude, longitude, lastname, address]
    );
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ message: 'The email is already registered.' });
    }
    console.error(err);
    res.status(500).json({ message: 'Error registering user.' });
  }
  
});

// Ruta para obtener todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting users.' });
  }
});

// Ruta para login de usuario
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe en la base de datos
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'User not found.' });
    }

    const user = result.rows[0];

    // Desencriptar la contraseña almacenada
    const bytes = CryptoJS.AES.decrypt(user.password, SECRET_KEY);
    const storedPassword = bytes.toString(CryptoJS.enc.Utf8);
    
    // Comparar la contraseña proporcionada con la desencriptada
    if (password !== storedPassword) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Si las credenciales son correctas, enviar los datos del usuario
    res.json({
      message: 'Successful login',
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
    res.status(500).json({ message: 'Login error' });
  }
});

// Ruta para obtener todas las alertas
app.get('/alerts', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM alert');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting alerts' });
  }
});

// Iniciar servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor backend corriendo en http://0.0.0.0:${port}`);
});

