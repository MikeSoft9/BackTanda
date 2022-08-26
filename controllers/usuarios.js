const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {
    //const query = req.query;
    const { limite = 5, desde = 0, estatus = true } = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estatus: estatus }),
        Usuario.find({ estatus: estatus })
        .skip(desde)
        .limit(limite)
    ]);

    res.json({
        total,
        usuarios
    });
};

const usuariosPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, ...resto } = req.body;

    //TODO: validar contra la base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
};

const usuariosPost = async(req, res = response) => {
    const { usuario, password } = req.body;
    const user = new Usuario({ usuario, password });

    //Encriptar la contraseña
    // Este el numero de vueltas para la encriptacion, si es muy grande tardará más tiempo 
    //10 es el valor por defecto, asi que no se coloca
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await user.save();

    res.json({
        msg: 'post API - controlador',
        user
    });
};

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // Borrado fisico
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Borrado logico
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });


    res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}