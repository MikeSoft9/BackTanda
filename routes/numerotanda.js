const { Router } = require('express');
const { check } = require('express-validator');

const {
    numeroPorTandaGet
} = require('../controllers/numeroTanda');

const router = Router();

router.get('/', numeroPorTandaGet);

module.exports = router;