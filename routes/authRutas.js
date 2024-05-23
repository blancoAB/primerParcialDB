//LLAMAR LIBRERIAS
const express = require('express');
const routes = express.Router();
const UsuarioModel = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklist = require('../models/blacklist');

//registro
routes.post('/registro',async (req,res)=>{
    try{
        const {nombre,usuario,pass} = req.body;
        const Usuario = new UsuarioModel({nombre,usuario,pass});
        await Usuario.save();
        res.status(201).json({mensaje: 'usuario registrado'});
    }
    catch(error){
        res.status(500).json({mensaje: error.message});
    }
});

//inicio de sesion
routes.post('/iniciarsesion',async (req,res)=>{
    try{
        const {usuario,pass} = req.body;
        const Usuario = await UsuarioModel.findOne({usuario});
        if(!Usuario){
            return res.status(401).json({error: 'usuario invalido!!!!!!!'});
        }
        const validarPass = await Usuario.compararPass(pass);
        if(!validarPass)
            return res.status(401).json({error: 'contrasenia invalido!!!!!!!'});
        //creacion del token
        const token = jwt.sign({usuarioId: Usuario._id},'clave_secreta',{expiresIn: '5h'});
        res.json({token});
    }
    catch(error){
        res.status(500).json({mensaje: error.message});
    }
});

//cerrar sesion 
routes.post('/cerrarsesion', async (req, res) => {
    try{
            const token = req.headers.authorization?.split(' ')[1];
            blacklist.add(token);
            console.log(blacklist);
            res.json({ mensaje: 'Sesión cerrada' });
        }       
    catch(error){
        res.status(500).json({mensaje: error.message});
    }

 });

module.exports = routes;

