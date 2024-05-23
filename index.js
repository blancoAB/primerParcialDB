//SISTEMA ACADÉMICO WEB, DE GESTIÓN DE PROCESOS ACADÉMICOS, ADMINISTRATIVOS Y DE COMUNICACIÓN, DENTRO LA UNIDAD EDUCATIVA DON BOSCO

//OBJETIVO GENERAL Diseñar e implementar un sistema académico web para la gestión integral de los procesos académicos, administrativos y de comunicación dentro de la Unidad Educativa Don Bosco.

//LLAMAR LIBRERIAS
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//LA CONFIGURACION ENV
require('dotenv').config();
const  app = express();

//apra acceder a la rutas
const actividadRutas = require('./routes/actividadRutas.js');
const authRutas= require('./routes/authRutas');
const Usuario = require('./models/usuario.js');
const profRutas = require('./routes/profRutas');
const blacklist = require('./models/blacklist.js');

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
 

//definimos una funcion que permita autenticar
const autenticar = async (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        res.status(401).json({mensaje: 'no existe token de autenticacion'});
    if (blacklist.has(token)){ 
        console.log(blacklist);
        return res.status(401).json({ error: 'Token revocado' });
    }
    try{
        const decodificar = jwt.verify(token, 'clave_secreta');
        req.usuario = await Usuario.findById(decodificar.usuarioId);
        next();
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
};
 app.use('/DB',autenticar,actividadRutas); // para realizar una autenticacion para realizar todo lo demas  

//utilizar las rutas de receteas
//app.use('/DB',actividadRutas);
app.use('/auth',authRutas);

//pra utilizar rutas de profesor y los endpoint 
app.use('/prof',autenticar,profRutas);
