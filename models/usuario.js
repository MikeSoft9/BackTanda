const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    usuario: {
        type: String,
        required: [true, 'El usuario es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    estatus: {
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJson = function() {
    const { _v, password, ...usuario } = this.toObject();
    return usuario
}

module.exports = model('Usuarios', UsuarioSchema);