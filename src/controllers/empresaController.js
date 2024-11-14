const empresaModel = require("../models/empresaModel");

const logradouroModel = require("../models/logradouroModel");

const getEmpresas = (req,res)=>{
    empresaModel.getEmpresas()
    .then((resultado) => {res.status(200).json(resultado);console.log(resultado)})
    .catch((err) => {res.status(500).json(err.sqlMessage);console.log(err)})
};

const postEmpresa = (req, res) => {
    let nome = req.body.nome;
    let bairro = req.body.bairro;

    let cnpj = req.body.cnpj;            
    let cep_sede = req.body.cep;
    let regiao = req.body.regiao;
    let logradouro = req.body.logradouro;
    let numero_logr = req.body.num_logradouro;
    let cidade = req.body.cidade;
    let uf = req.body.uf;

    logradouroModel.postLogradouro(cep_sede, uf, cidade, bairro, logradouro, numero_logr, regiao)
    .then((resultado) => {

        logradouroModel.getLogradouro(cep_sede, numero_logr)
        .then((respostaId) => {

            let fkLogradouro = respostaId[0].id;

            empresaModel.postEmpresa(nome, cnpj, fkLogradouro)
            .then((resultadoCadastro) =>{

                res.status(200).json(resultadoCadastro);
                console.log(resultadoCadastro);
            })
            .catch((err) => {res.status(500).json(err.sqlMessage);console.log(err)})
        })
        .catch((err) => {res.status(500).json(err.sqlMessage);console.log(err)})   
    })
    .catch((err) => {res.status(500).json(err.sqlMessage);console.log(err)})
};

module.exports = {getEmpresas,postEmpresa};