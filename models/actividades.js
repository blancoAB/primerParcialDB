const mongoose = require('mongoose');
//definir el esquema
const actividadSChema = new mongoose.Schema({
    //nombre: {type: String, require: true}
    actividad : String,
    idtipo : { type: mongoose.Schema.Types.ObjectId, ref: 'tipo' },
    idresponsable : { type: mongoose.Schema.Types.ObjectId, ref: 'profesores' },
    participantes : String,
    fecha : String,
    hora : String,
    descripcion : String,
    observacion : String,
    documento : String,
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});//llevar este esquema a un modelo

const ActividadModel = mongoose.model('Actividad',actividadSChema,'actividad');
module.exports = ActividadModel;
