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

module.exports = {
    numeroPorTandaGet
};