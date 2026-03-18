import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"


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
const storage = getStorage(app)

export const uploadImage = async (file: File) => {
  const storageRef = ref(storage, `noticias/${Date.now()}-${file.name}`)

  await uploadBytes(storageRef, file)

  const url = await getDownloadURL(storageRef)

  return url
}