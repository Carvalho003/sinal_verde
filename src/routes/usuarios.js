var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/:empresaId", (req,res) => {
    usuarioController.buscarPelaEmpresa(req, res)
})

router.get("/single/:id", (req, res) => {
    usuarioController.buscarPeloId(req,res)
})

router.put("/single/:id", (req, res) => {
    usuarioController.editarPeloId(req, res)
})

module.exports = router;