const database = require("../database/config");

const getEmpresas = () =>{
    const instrucaoSql = `
        SELECT e.nome AS nome, l.cidade AS localidade, COUNT(c.id) AS colaboradores, e.id as id FROM empresa AS e JOIN logradouro l ON e.logradouro_id = l.id JOIN usuario c ON c.empresa_id = e.id GROUP BY e.id ORDER BY nome ASC LIMIT 15 OFFSET 0;
    `;
    
    return database.executar(instrucaoSql);
};

const postEmpresa = () => {
    // TODO
};

module.exports = {getEmpresas, postEmpresa};