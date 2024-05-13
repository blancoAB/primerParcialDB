//SISTEMA ACADÉMICO WEB, DE GESTIÓN DE PROCESOS ACADÉMICOS, ADMINISTRATIVOS Y DE COMUNICACIÓN, DENTRO LA UNIDAD EDUCATIVA DON BOSCO

//OBJETIVO GENERAL Diseñar e implementar un sistema académico web para la gestión integral de los procesos académicos, administrativos y de comunicación dentro de la Unidad Educativa Don Bosco.

//LLAMAR LIBRERIAS
const express = require('express');
const mongoose = require('mongoose');
//LA CONFIGURACION ENV
require('dotenv').config();
const  app = express();

//apra acceder a la rutas
const actividadRutas = require('./routes/actividadRutas.js');

 //CONEXTARSE CON EL PUERTO Y MONGO EN EL ENV
 const PORT = process.env.PORT || 3000;
 const  MONGO_URI = process.env.MONGO_URI;
  
 //conexion de json
app.use(express.json());

 
 //CONEXION CON MONGO DB
 mongoose.connect(MONGO_URI).then(
     ()=>{
         console.log('conexion exitosa');
         app.listen(PORT,()=>{console.log("Servidor express corriendo en el puerto "+ PORT)})
     }
 ).catch(error=>console.log('error de conexion', error));
 
//utilizar las rutas de receteas
app.use('/DB',actividadRutas);
