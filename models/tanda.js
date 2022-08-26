const { Schema, model } = require('mongoose');

const TandaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la tanda es obligatorio']
    },
    fechaInicio: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    totalNumeros: {
        type: Number,
        default: 10
    },
    periodoEntrega: {
        type: Number,
        default: 7
    },
    fechaFin: {
        type: Date
    },
    activa: {
        type: Boolean,
        default: true
    }
});



module.exports = model('Tanda', TandaSchema);