const { response, request } = require('express');
const numeroTanda = require('../models/numeroTanda');

const numeroPorTandaGet = async(req = request, res = response) => {
    const { nombre } = req.query;
    const [nums] = await Promise.all([
        numeroTanda.find({ nombreTanda: nombre })
    ]);
    res.json(
        nums
    );
};
const actualizarNombrePut = async(req, res = response) => {
    const { id } = req.params;
    const { nombre, entregado } = req.body;

    const numero = await numeroTanda.findByIdAndUpdate(id, { nombre, entregado });
    res.json(true);
};

module.exports = {
    numeroPorTandaGet,
    actualizarNombrePut

};