

const { Schema, model } = require('mongoose');


// esto es todo lo que ocupamos para poder conectarnos ala ba se de datos
// para poder hacer grabaciones, insersiones, buscar por id
const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
})


module.exports = model('Usuario', UsuarioSchema);