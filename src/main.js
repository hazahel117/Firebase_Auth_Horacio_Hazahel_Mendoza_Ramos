import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/bootswatch.css";

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB-3Gbu_bKIMPPE9i2mS-Bxy0zYvuqlAzI",
    authDomain: "tareafirebase-c3d18.firebaseapp.com",
    projectId: "tareafirebase-c3d18",
    storageBucket: "tareafirebase-c3d18.appspot.com",
    messagingSenderId: "55160618224",
    appId: "1:55160618224:web:6c462e9fdeb19901865635"
  };

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth, storage };


onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user)
      const usuarioActivo ={
        email: user.email,
        uid: user.uid
      }
     store.dispatch('detectarUsuario', usuarioActivo)
    // ...
  } else {
    console.log(user)
    store.dispatch('detectarUsuario', user)
  } 
});

createApp(App).use(store).use(router).mount('#app')
