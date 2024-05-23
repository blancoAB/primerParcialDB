//LLAMAR LIBRERIAS
const express = require('express');
const routes = express.Router();
const ActividadModel = require('../models/actividades');
const UsuarioModel = require('../models/usuario');

//endpoint1 traer todas las actividades
routes.get('/traerActividades',async (req,res) => {
    try{
        const actividad = await ActividadModel.find();
        res.json(actividad);
    }catch (error){
        res.status(500).json({mensaje:error.message});
    }
});
//endpoint2 Crear una actividad
routes.post('/crear',async (req,res) => {
    const actividad= new ActividadModel({
        actividad : req.body.actividad,
        idtipo : req.body.idtipo,
        idresponsable : req.body.idresponsable,
        participantes : req.body.participantes,
        fecha : req.body.fecha,
        hora : req.body.hora,
        descripcion : req.body.descripcion,
        observacion : req.body.observacion,
        documento : req.body.documento,
        usuario : req.body.usuario//asignar el Id del usuario
    })
    try{
        const nuevaActividad = await actividad.save();
        console.log(actividad);
        res.status(201).json(nuevaActividad);
    }catch (error){
        res.status(400).json({mensaje:error.message});
    }
});

//endpoint3 editar actividad
routes.put('/editar/:id',async (req,res) => {
    try{
        const actividadEditada = await ActividadModel.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if(!actividadEditada)
            return res.status(404).json({mensaje: "Actividad no encontrada!!!"});
        else
            return res.json(actividadEditada);
    }catch (error){
        res.status(400).json({mensaje:error.message});
    }
});

//endpoint4 eliminar actividad
routes.delete('/eliminar/:id',async (req,res) => {
    try{
        const actividadEliminada = await ActividadModel.findByIdAndDelete(req.params.id);
        if(!actividadEliminada)
            return res.status(404).json({mensaje: "Actividad no encontrada!!!"});
        else
            return res.json(actividadEliminada);
    }catch (error){
        res.status(400).json({mensaje:error.message});
    }
});

//endpoint5 Buscar todas las actividades que contienen la palabra "virgen" en la descripción:
routes.get('/encontrardescripcion/:descripcion', async (req, res) => {
    try {
        //regex sirve para buscar una cadena de texto exacta.
        const descripcionRegex = new RegExp(req.params.descripcion, 'i'); // 'i' para hacer la búsqueda insensible a mayusculas y minusculas
        const actividadDescripcion = await ActividadModel.find({ descripcion: descripcionRegex });
        return res.json(actividadDescripcion);
    } catch(error) {
        res.status(400).json({ mensaje :  error.message})
    }
});

//endpoint6 Buscar todas las actividades de hora "8:30 para adelante" y ordenarlo por nombre de actividad en forma ascendente:
routes.get('/encontrarhora/:hora', async (req, res) => {
    try {
        const actividadHora = await ActividadModel.find({ hora: req.params.hora}).sort({ actividad: 1 });
        return res.json(actividadHora);
    } catch(error) {
        res.status(400).json({ mensaje :  error.message})
    }
});

//endpoint7 Buscar todas las actividades donde las fechas sean "27 de mayo" y "29 de mayo":
routes.get('/dosfechas/:fecha', async (req, res) => {
    try {
        const fechasPermitidos = ["27 de mayo" , "29 de mayo"];
        if (!fechasPermitidos.includes(req.params.fecha)) {
            return res.status(400).json({ mensaje: "Fecha de actividad no válido" });
        }
        
        const actividadFecha = await ActividadModel.find({ fecha: req.params.fecha });
        return res.json(actividadFecha);
    } catch(error) {
        res.status(400).json({ mensaje: error.message });
    }
});
//endpoint8 Encontrar todas las actividades donde participen "profesores y estudiantes" pero que no sea en fecha "6 de mayo":
routes.get('/participantes/:participantes', async (req, res) => {
    try {
        const actividadParticipantes = await ActividadModel.find({ 
            participantes: req.params.participantes,
            fecha: { $ne: "6 de mayo" } // Buscar actividades que no sean de fecha "6 de mayo"
        });
        return res.json(actividadParticipantes);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

//endpoint9 Contar todas las actividades donde participen los "profesores y estudiantes"
routes.get('/contar/:participantes', async (req, res) => {
    try {
        const actividadParticipantes = await ActividadModel.countDocuments({ participantes: req.params.participantes});
        return res.json(actividadParticipantes);
    } catch(error) {
        res.status(400).json({ mensaje :  error.message})
    }
});


//REPORTE 1 traer actividades por usuario
routes.get('/actividadusuario/:usuarioId', async(peticion,respuesta)=>{
    const {usuarioId} = peticion.params;
    console.log(usuarioId);
    try{
        const usuario = await UsuarioModel.findById(usuarioId);
        if(!usuario)
            return respuesta.status(404).json({mensaje:'usuario no encontrado'});
        const actividad = await ActividadModel.find({usuario: usuarioId}).populate('usuario');
    respuesta.json(actividad) ;
    }
    catch(error){
        respuesta.status(500).json({mensaje: error.message})
    }
});

//REPORTE 2 traer actividades por profesor del tipo social


module.exports = routes;
