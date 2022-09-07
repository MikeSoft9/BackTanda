const Usuario = require('../models/usuario');
const Tanda = require('../models/tanda');
const numeroTanda = require('../models/numeroTanda');


const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe  ${id} `);
    }
};

const existeTandaporNombre = async(nombre) => {
    const existeTanda = await Tanda.findOne({ nombre });
    if (existeTanda) {
        throw new Error(`El nombre:  ${nombre} ya existe, intente con otro`);
    }
};
const existeNumeroPorId = async(id) => {
    const existeNumero = await numeroTanda.findById(id);
    if (!existeNumero) {
        throw new Error(`El id no existe:  ${id} `);
    }
};


module.exports = {
    existeUsuarioPorId,
    existeTandaporNombre,
    existeNumeroPorId
}