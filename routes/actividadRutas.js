//LLAMAR LIBRERIAS
const express = require('express');
const routes = express.Router();
const ActividadModel = require('../models/actividades');

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
        tipo : req.body.tipo,
        responsable : req.body.responsable,
        lugar : req.body.lugar,
        descripcion : req.body.descripcion
    })
    try{
        const nuevaActividad = await actividad.save();
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

//endpoint6 Buscar todas las actividades de tipo "Mes mariano" y ordenarlo por nombre de actividad en forma ascendente:
routes.get('/encontrartipo/:tipo', async (req, res) => {
    try {
        const actividadTipo = await ActividadModel.find({ tipo: req.params.tipo}).sort({ actividad: 1 });
        return res.json(actividadTipo);
    } catch(error) {
        res.status(400).json({ mensaje :  error.message})
    }
});

//endpoint7 Buscar todas las actividades sociales o académicas:
routes.get('/dostipos/:tipo', async (req, res) => {
    try {
        const tiposPermitidos = ["Social", "Academico"];
        if (!tiposPermitidos.includes(req.params.tipo)) {
            return res.status(400).json({ mensaje: "Tipo de actividad no válido" });
        }
        
        const actividadTipo = await ActividadModel.find({ tipo: req.params.tipo });
        return res.json(actividadTipo);
    } catch(error) {
        res.status(400).json({ mensaje: error.message });
    }
});
//endpoint8 Encontrar todas las actividades organizadas por la "Comisión Pastoral" que no son de tipo "Mes mariano":
routes.get('/responsable/:responsable', async (req, res) => {
    try {
        const actividadResponsable = await ActividadModel.find({ 
            responsable: req.params.responsable,
            tipo: { $ne: "Mes Mariano" } // Buscar actividades que no sean de tipo "Mes mariano"
        });
        return res.json(actividadResponsable);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

//endpoint9 Contar todas las actividades organizadas por la "Comisión Pastoral"
routes.get('/contar/:responsable', async (req, res) => {
    try {
        const actividadResponsable = await ActividadModel.countDocuments({ responsable: req.params.responsable});
        return res.json(actividadResponsable);
    } catch(error) {
        res.status(400).json({ mensaje :  error.message})
    }
});


module.exports = routes;
