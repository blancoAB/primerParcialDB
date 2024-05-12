const mongoose = require('mongoose');
//definir el esquema
const actividadSChema = new mongoose.Schema({
    //nombre: {type: String, require: true}
    actividad : String,
    tipo : String,
    responsable : String,
    lugar : String,
    descripcion : String
});//llevar este esquema a un modelo

const ActividadModel = mongoose.model('Actividad',actividadSChema,'actividad');
module.exports = ActividadModel;
