import { initializeApp } from "firebase/app"
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAqnx718mmZd_FA2Bg6VRL7SfI5h9jNnZE",
  authDomain: "rota-7-lagoas.firebaseapp.com",
  projectId: "rota-7-lagoas",
  storageBucket: "rota-7-lagoas.firebasestorage.app",
  messagingSenderId: "311360052704",
  appId: "1:311360052704:web:796bdec7f07e8ce2855f85",
  measurementId: "G-K91N7CYJNC"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

// 🔥 GARANTE que o login persiste
setPersistence(auth, browserLocalPersistence)

export const db = getFirestore(app)


