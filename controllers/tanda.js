const { response, request } = require('express');
const Tanda = require('../models/tanda');
const numeroTanda = require('../models/numeroTanda');

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const tandaGet = async(req = request, res = response) => {
    const { activa = true } = req.query;

    const [tandas] = await Promise.all([
        Tanda.find({ activa: activa })
    ]);

    res.json(
        tandas
    );
};

const tandaPost = async(req = request, res = response) => {
    const { nombre, fechaInicio, totalNumeros, periodoEntrega, fechaFin, activa } = req.body;
    const tanda = new Tanda({ nombre, fechaInicio, totalNumeros, periodoEntrega, fechaFin, activa });
    await tanda.save();

    var i = 0;
    var fecha = new Date(fechaInicio);
    console.log(fecha.toLocaleDateString('zh-Hans-CN'));
    for (i = 1; i <= totalNumeros; i++) {
        var persona = "Numero" + i.toString();
        const numerotanda = new numeroTanda({
            numero: i,
            nombreTanda: nombre,
            nombre: persona,
            fechaEntrega: formatDate(fecha),
            entregado: false
        });
        await numerotanda.save();

        fecha.setDate(fecha.getDate() + periodoEntrega);
        console.log(fecha);
    }

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