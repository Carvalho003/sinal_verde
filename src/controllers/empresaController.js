const empresaModel = require("../models/empresaModel");

const getEmpresas = (req,res)=>{
    empresaModel.getEmpresas()
    .then((resultado) => {res.status(200).json(resultado);console.log(resultado)})
    .catch((err) => {res.status(500).json(err.sqlMessage);console.log(err)})
};

const postEmpresa = (req, res) => {

};

module.exports = {getEmpresas,postEmpresa};