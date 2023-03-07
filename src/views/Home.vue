<template>
  <div>
    <Navbar/>
    <div class="titulo1">
      <h1>Autentificación con Firebase</h1>
      <h2>Horacio Hazahel Mendoza Ramos</h2>
      <p>Este es un trabajo de autentificación utilizando la herramienta del mismo nombre de Firebase</p>
    </div>
    
    <div class="sesion" v-if="!existeUsuario" >
      <div class="cara">
        <img src="../assets/triste.png" alt="">
      </div>
      <p>Inicia Sesión para poder utilizar el tablero Kanban de la página Web</p>
    </div>


    <div class="sesion" v-if="existeUsuario" >
      <div class="cara">
        <img src="../assets/feliz.png" alt="">
      </div>
      <p>Sesión iniciada, da click al apartado de "Tablero Kanban" para utilizarlo</p>
    </div>

    
<!-- ////////// tabla ////////// -->
<!--


  <div class="container">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Nombre</th>
        <th scope="col">Contraseña</th>
        <th scope="col">Eliminar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in usuarios" :key="index">
        <th scope="row">{{index}}</th>
        <td>{{item.nombre}}</td>
        <td>{{item.contraseña}}</td> 
        <td>
        <button @click.prevent="eliminarDato(item.id)" 
          class="btn btn-danger">Eliminar
        </button>
      </td>
      </tr>
    </tbody>
  </table>
  </div>
  -->
  <!-- ////////// formulario Añadir ////////// -->
    <!-- Nombre -->
    <!--

    
  <div class="container my-4">
  <form>  
    <div class="input-group mb-3">
    <span class="input-group-text">Nombre</span>
    <input v-model="usuario.nombre" type="text" class="form-control">
    </div>
    -->
    <!-- Contraseña 
    <div class="input-group mb-3">
    <span class="input-group-text">Contraseña</span>
    <input v-model="usuario.contraseña" type="text" class="form-control">
    </div>-->
    <!-- Boton Guardar 
    <div class="mt-3">  
    <button @click.prevent="agregarDato()" 
            class="btn btn-primary">Guardar
    </button>
    </div>
  </form>
  </div>-->
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore/lite';
import { db } from "../main";
import router from '../router/index'

import { auth } from "../main";
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    Navbar
  },
  data() {
    return {
      usuarios: [],
      usuario: {
      nombre: '',
      contraseña: ''
    }
    }
  },
  methods: {
    async obtenerDatos () { 
      const querySnapshot = await getDocs(collection(db, "usuarios"));
        querySnapshot.forEach((doc) => {
        let usuario = doc.data()
        usuario.id = doc.id
        this.usuarios.push(usuario)
        console.log(usuario)
      });
    },
    async agregarDato(){
      const docRef = await addDoc(collection(db, "usuarios"), {
        nombre: this.usuario.nombre,
        contraseña: this.usuario.contraseña
      })
        .then(() => {
          router.go('/')
          console.log("Documento añadido");
        })
        .catch(function(error) {
          console.error("Error al añadir el documento: ", error);
        });
    },
    // DELETE / ELIMINAR / BORRAR
    async eliminarDato (id){
      await deleteDoc(doc(db, "usuarios", id ));
      router.go('/')
    },
  },
  computed: {
    desactivar(){
        return this.password === this.repassword
    },
    ...mapGetters(['existeUsuario'])
  },
  mounted() {
    this.obtenerDatos();
  },
}
</script>