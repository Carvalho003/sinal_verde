const express = require('express')

const router = express.Router();

var logradouroController = require("../controllers/logradouroController");

router.post("/kpi1", function (req, res) {
    logradouroController.buscarkpi1(req, res)
})

router.post("/kpi2", function (req, res) {
    logradouroController.buscarkpi2(req, res)
})

router.get("/:empresaId/ruas", function(req, res){
    logradouroController.selectRuasMonitoradas(req, res)
})

router.post("/select_bairro", function (req, res) {
    logradouroController.selectBairro(req, res)
})

router.post("/:bairroId/select_ruas", function (req, res) {
    logradouroController.selectRuas(req, res)
}) 

router.post("/search", function (req, res) {
    logradouroController.search(req, res)
}) 

module.exports = router