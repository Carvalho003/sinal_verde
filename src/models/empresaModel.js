const database = require("../database/config");

const getEmpresas = () =>{
    const instrucaoSql = `
        
    `;
    
    return database.executar(instrucaoSql);
};

const postEmpresa = () => {

};

module.exports = {getEmpresas, postEmpresa};