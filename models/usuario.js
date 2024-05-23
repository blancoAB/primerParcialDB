const mongoose = require('mongoose');
//llamar a la libreria bcrypt para realizar el hasheo
const bcrypt = require('bcrypt');

//definir el esquema
const usuarioSChema = new mongoose.Schema({
    nombre: {type: String, require: true, unique:true},
    usuario: {type: String, require: true, unique:true},
    pass: {type: String, require: true},


});//llevar este esquema a un modelo

//para realizar el hasheo de la contraseña
usuarioSChema.pre('save', async function(next){
    if (this.isModified('pass')){
        this.pass = await bcrypt.hash(this.pass, 10)// tiene 2 parametros el dato y la cantidad
    }
    next();
});

//comparar contraseña
usuarioSChema.methods.compararPass = async function (passComparar){
    return await bcrypt.compare(passComparar,this.pass )
};


const UsuarioModel = mongoose.model('Usuario',usuarioSChema,'usuario');
module.exports = UsuarioModel;
