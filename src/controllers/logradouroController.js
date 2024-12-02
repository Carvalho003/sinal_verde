var logradouroModel = require("../models/logradouroModel");

function buscarkpi1(req, res) {
    const empresaId = req.body.idEmpresaServer;
    console.log('To aqui no controller');

        logradouroModel.buscarkpi1(empresaId)
        .then(resultado => {
            res.json({
                logradouro: resultado.length
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
    const bairroId = req.params.bairroId;
    console.log('To aqui no controller');

        logradouroModel.selectRuas(nomeBairro, nomeCidade, bairroId)
        .then(resultado => {
            res.json({
                lista: resultado
            });
        }).catch(e => {
            res.json(e);
        })
}

function search(req, res) {
    const input = req.body.inputServer;
    const uf = req.body.ufServer;
    console.log(input + ' ' + uf);

    logradouroModel.search(input, uf)
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
    selectRuas,
    search,
}