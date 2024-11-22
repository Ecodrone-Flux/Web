import { db, ref, set, get } from './firebase'; // Cambiar a Realtime Database
import bcrypt from 'bcryptjs';

// Función para agregar un usuario
export const addUser = async (name, email, password, latitude, longitude) => {
    try {
      // Validación de los datos
      if (!email.includes('@')) throw new Error('El email no tiene un formato válido.');
      if (password.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres.');
      if (isNaN(latitude) || isNaN(longitude)) throw new Error('La latitud y longitud deben ser números.');
  
      // Cifrar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear una nueva referencia para el usuario en Realtime Database
      const userRef = ref(db, 'users/' + email.replace(/[^a-zA-Z0-9]/g, '_')); // Usamos el email como clave, reemplazando caracteres no válidos
  
      // Agregar el usuario a la base de datos
      await set(userRef, {
        name,
        email,
        password: hashedPassword,
        latitude,
        longitude,
      });
  
      console.log(`[Realtime Database] Usuario agregado: ${email}`);
      return { success: true };
    } catch (e) {
      console.error(`[Realtime Database] Error al agregar usuario: ${e.message}`);
      return { success: false, error: { message: e.message, code: e.code || 'unknown_error' } };
    }
  };
  
// Función para obtener todos los usuarios
export const getUsers = async () => {
    try {
      // Obtener todos los usuarios de Realtime Database
      const snapshot = await get(ref(db, 'users')); // Ruta de usuarios
      const usersList = snapshot.exists() ? Object.values(snapshot.val()) : []; // Convertir los datos a un array
  
      if (usersList.length === 0) console.warn("[Realtime Database] No hay usuarios en la base de datos.");
  
      return { success: true, data: usersList };
    } catch (e) {
      console.error(`[Realtime Database] Error al obtener usuarios: ${e.message}`);
      return { success: false, error: { message: e.message, code: e.code || 'unknown_error' } };
    }
};  
