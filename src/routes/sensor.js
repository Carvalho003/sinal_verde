const express = require('express')

const router = express.Router();

const controller = require('../controllers/sensorController')

router.post('/', function(req, res) {
    controller.inserirDados(req, res)
})

module.exports = router