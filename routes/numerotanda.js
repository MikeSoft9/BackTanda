const { Router } = require('express');
const { check } = require('express-validator');

const { existeNumeroPorId } = require('../helpers/db-validators');

const {
    numeroPorTandaGet,
    actualizarNombrePut
} = require('../controllers/numeroTanda');

const router = Router();

router.get('/', numeroPorTandaGet);

router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeNumeroPorId)
    ],
    actualizarNombrePut);

module.exports = router;