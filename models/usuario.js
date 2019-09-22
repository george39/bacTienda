var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    nik: { type: String, unique: true, required: [true, 'El nik es obligatorio'] },
    password: { type: String, required: [true, 'La contraseña es obligatoria'] },
    role: { type: String, required: true, default: 'USER_ROLE' }
});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único ' })


module.exports = mongoose.model('Usuario', usuarioSchema);