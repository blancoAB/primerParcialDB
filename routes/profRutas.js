//llamar librerias
const express = require('express');
const routes = express.Router();
const ProfesorModel= require('../models/profesores');

//CRUD2 registro de maestros 
routes.post('/registro', async (peticion, respuesta)=>{
    const prof= new ProfesorModel({
        nombreprof : peticion.body.nombreprof,
        comision : peticion.body.comision,
        asesoria : peticion.body.asesoria,
        area : peticion.body.area,
        cursos  : peticion.body.cursos,
        celular : peticion.body.celular
    });
    try{
        const nuevoProf = await prof.save();
        console.log(prof);
        respuesta.status(201).json(nuevoProf);
    }catch(error){
        respuesta.status(400).json({mensaje:error.message});
    }
});


//CRUD2 traer todos los maestros 
routes.get('/getProfes', async (req,res)=>{
    try{
        const profesor = await ProfesorModel.find();
        res.json(profesor);
    }catch{
        res.status(500).json({mensaje: error.message});
    }
});

//CRUD2 actualizar datos de un maestro 
routes.put('/actualizar/:id', async (req, res)=>{
    try{
        const profesorActualizado = await ProfesorModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!profesorActualizado)
            return res.status(404).json({mensaje: 'Profesor/a no encontrado!!!!'});
        else 
            return res.json({profesorActualizado});
    }catch(error){
        res.status(500).json({mensaje: error.message});
    }
});

//CRUD2 eliminar un maestro por id
routes.delete('/eliminar/:id',async (req,res)=>{
    try{
        const profesorEliminado = await ProfesorModel.findByIdAndDelete(req.params.id);
        if(!profesorEliminado)
            return res.status(404).json({mensaje: 'Profesor/a no encontrado!!!!'});
        else   
            return res.json({mensaje: 'Profesor/a eliminado!!!!'});
    }catch(error){
        res.status(400).json({mensaje: error.message});
    }

});
//para exportar las rutas
module.exports = routes;