// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyDOO9O2Jtx4XXGntyAUCZo7vWRHVOGtLrY',
  authDomain: 'ojota-artesanales.firebaseapp.com',
  projectId: 'ojota-artesanales',
  storageBucket: 'ojota-artesanales.appspot.com',
  messagingSenderId: '1077757301998',
  appId: '1:1077757301998:web:463f42e48b4a2b86c88fff'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app)
