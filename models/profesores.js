const mongoose =  require('mongoose');
//definimos el esquema
const profesorSchema = new mongoose.Schema({
    nombreprof : {type: String, require: true, unique:true},
    comision : {type: String},
    asesoria : {type: String},
    area : {type: String, require: true},
    cursos : {type: String},
    celular : {type: String, require: true} 
});

//llevamos este esquema a un modelo
const ProfesorModel = mongoose.model('Profesor',profesorSchema,'profesores');

//exportar modelo 
module.exports = ProfesorModel;