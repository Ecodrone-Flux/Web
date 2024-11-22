import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBXl-03V2_2pL5KWARGCIr8EuiDXO6mpmM",
    authDomain: "ecodrone-c94a3.firebaseapp.com",
    databaseURL: "https://ecodrone-c94a3-default-rtdb.firebaseio.com",
    projectId: "ecodrone-c94a3",
    storageBucket: "ecodrone-c94a3.firebasestorage.app",
    messagingSenderId: "94180604959",
    appId: "1:94180604959:web:ab24358b29ece330fd292a"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Realtime Database
const db = getDatabase(app);

// Exportar el servicio de Realtime Database
export { db, ref, set, get };
