var express = require("express");
var router = express.Router();

const empresaController = require('../controllers/empresaController');

router.get("/", function (req, res) {
    empresaController.getEmpresas(req,res);
});

router.post("/cadastrar", function (req, res) {
    empresaController.postEmpresa(req,res);
});

router.get("/:empresaId", function(req,res){
    empresaController.getById(req, res);
})

router.put("/:empresaId/:logrId", function(req,res){
    empresaController.updateEmpresa(req, res);
})

module.exports = router;