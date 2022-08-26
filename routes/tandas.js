const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeTandaporNombre } = require('../helpers/db-validators');

const {
    tandaGet,
    tandaPost
} = require('../controllers/tanda');


const router = Router();

router.get('/', tandaGet);

router.post('/', [
    check('nombre', 'El nombre de la tanda es obligatorio').not().isEmpty(),
    check('nombre').custom(existeTandaporNombre),
    check('fechaInicio', 'La fecha de inicio es obligatoria').not().isEmpty(),
    validarCampos
], tandaPost);
module.exports = router;