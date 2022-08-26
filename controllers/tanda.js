const { response, request } = require('express');
const Tanda = require('../models/tanda');


const tandaGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0, activa = true } = req.query;

    const [total, tandas] = await Promise.all([
        Tanda.countDocuments({ activa: activa }),
        Tanda.find({ activa: activa })
        .skip(desde)
        .limit(limite)
    ]);

    res.json({
        total,
        tandas
    });
};

const tandaPost = async(req = request, res = response) => {
    const { nombre, fechaInicio, totalNumeros, periodoEntrega, fechaFin, activa } = req.body;
    const tanda = new Tanda({ nombre, fechaInicio, totalNumeros, periodoEntrega, fechaFin, activa })
    await tanda.save();

    res.json({
        nombre,
        fechaInicio,
        totalNumeros,
        periodoEntrega,
        fechaFin,
        activa
    })
};




module.exports = {
    tandaGet,
    tandaPost
}