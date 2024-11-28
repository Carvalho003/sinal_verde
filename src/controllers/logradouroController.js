var logradouroModel = require("../models/logradouroModel");

function buscarkpi1(req, res) {
    const empresaId = req.body.idEmpresaServer;
    console.log('To aqui no controller');

        logradouroModel.buscarkpi1(empresaId)
        .then(resultado => {
            res.json({
                logradouro: resultado[0].bairro
            });
        }).catch(e => {
            res.json(e);
        })
    
}

function buscarkpi2(req, res) {
    const empresaId = req.body.idEmpresaServer;
    console.log('To aqui no controller');

        logradouroModel.buscarkpi2(empresaId)
        .then(resultado => {
            res.json({
                logradouro: resultado[0].Logradouro
            });
        }).catch(e => {
            res.json(e);
        })
}

function selectBairro(req, res) {
    const empresaId = req.body.idEmpresaServer;
    console.log('To aqui no controller');

        logradouroModel.selectBairro(empresaId)
        .then(resultado => {
            res.json({
                lista: resultado
            });
        }).catch(e => {
            res.json(e);
        })
}

function selectRuas(req, res) {
    const nomeBairro = req.body.nomeBairroServer;
    const nomeCidade = req.body.nomeCidadeServer;
    console.log('To aqui no controller');

        logradouroModel.selectRuas(nomeBairro, nomeCidade)
        .then(resultado => {
            res.json({
                lista: resultado
            });
        }).catch(e => {
            res.json(e);
        })
}

module.exports = {
    buscarkpi1,
    buscarkpi2,
    selectBairro,
    selectRuas
}