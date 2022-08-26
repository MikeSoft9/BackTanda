const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const login = async(req, res = response) => {

    const { usuario, password } = req.body;

    try {

        // Verificar si existe el usuario
        const user = await Usuario.findOne({ usuario });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - usuario incorrecto'
            });
        }
        // Verificar si el usuario esta activo
        if (user.estatus === false) {
            return res.status(400).json({
                msg: 'El usuario no existe -- estatus:false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password son incorrectos -- password'
            });
        }
        // Generar el JWT


        res.json({
            msg: 'Login válido'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Ocurrio un error, comuniquese con el administrador del sistema"
        });
    }


}

module.exports = {
    login
}