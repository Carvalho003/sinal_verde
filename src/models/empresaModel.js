const database = require("../database/config");

const getEmpresas = () =>{
    const instrucaoSql = `
        SELECT e.nome AS nome, l.cidade AS localidade, COUNT(c.id) AS colaboradores, e.id as id FROM empresa AS e  JOIN logradouro l ON e.logradouro_id = l.id LEFT JOIN usuario c ON c.empresa_id = e.id GROUP BY e.id ORDER BY nome ASC ;
    `;
    
    return database.executar(instrucaoSql);
};

const postEmpresa = (nome, cnpj, fkLogradouro) => {
    const instrucaoSql = `
        INSERT INTO empresa (nome, cnpj, logradouro_id)
        VALUES 
            ('${nome}', '${cnpj}', ${fkLogradouro})
    `;
    
    return database.executar(instrucaoSql);
};

module.exports = {getEmpresas, postEmpresa};