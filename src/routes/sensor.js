const express = require('express')

const router = express.Router();

const controller = require('../controllers/sensorController')

router.post('/', function(req, res) {
    controller.inserirDados(req, res)
})

router.get('/hour/:sensorId', function(req, res){
    controller.graficoUltimaHora(req, res);
})


router.post('/hour', function(req, res){
    controller.graficoUltimaHoraBairro(req, res);
})

router.post('/bairro', function(req, res){
    controller.graficoRuasDoBairroCongestionadas(req, res);
})



router.get('/six/:sensorId', function(req, res){
    controller.graficoSeisHoras(req, res);
})

router.post('/six', function(req, res){
    controller.graficoSeisHorasBairro(req, res);
})

router.get('/twelve/:sensorId', function(req, res){
    controller.graficoDozeHoras(req, res);
})

router.post('/twelve', function(req, res){
    controller.graficoDozeHorasBairro(req, res);
})

module.exports = router