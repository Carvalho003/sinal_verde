const empresaModel = require("../models/empresaModel");

const logradouroModel = require("../models/logradouroModel");

// const logradouroController = require("../controllers/logradouroController")

const getEmpresas = (req,res)=>{
    empresaModel.getEmpresas()
    .then((resultado) => {res.status(200).json(resultado);console.log(resultado)})
    .catch((err) => {res.status(500).json(err.sqlMessage);console.log(err)})
};

const updateEmpresa = (req, res) => {
    const empresaId = req.params.empresaId;
    const logrId = req.params.logrId;
    const nome = req.body.nome;
    const cnpj = req.body.cnpj;
    const cep_sede = req.body.cep;
    const numero_logr = req.body.num_logradouro;
    const logradouro = req.body.logradouro;
    const bairro = req.body.bairro;
    const regiao = req.body.regiao;
    const cidade = req.body.cidade;
    const uf = req.body.uf;
    const resposta ={
    } 
    empresaModel.updateEmpresa(nome, cnpj, empresaId).then(response => {
        resposta.empresaRes = response
        
    }).catch(e => {
        res.json({
            message: "Erro interno de servidor",
            error: e
        })
    })

    logradouroModel.updateLogradouro(cep_sede, uf, cidade,bairro,logradouro,numero_logr,uf,regiao,logrId).then(response => {
        resposta.logradouroRes = response;
        res.json(resposta);
    }).catch(e => {
        res.json({error: e})
    })
}

const getById = (req, res) => {
    const empresaId = req.params.empresaId;
    empresaModel.getById(empresaId).then(response => {
        res.json(response[0])
    }).catch(e => {
        res.json({
            message: "Erro interno de servidor",
            error: e
        })
    })
}

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

module.exports = {
    getEmpresas,
    postEmpresa,
    getById,
    updateEmpresa
};