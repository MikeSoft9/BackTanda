const { Schema, model } = require('mongoose');

const NumeroTandaSchema = Schema({
    numero: {
        type: Number,
        required: [true, 'El numero de la tanda es obligatorio']
    },
    nombreTanda: {
        type: String,
        required: [true, 'El nombre de la tanda es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre de la persona es obligatorio']
    },
    fechaEntrega: {
        type: String
    },
    entregado: {
        type: Boolean,
        default: false
    }

});
module.exports = model('NumeroTanda', NumeroTandaSchema);