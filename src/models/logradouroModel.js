const database = require("../database/config");

const getLogradouro = (cep, numero) =>{
    const instrucaoSql = `
        SELECT id FROM logradouro WHERE cep = '${cep}' AND numLogradouro = '${numero}';
    `;
    
    return database.executar(instrucaoSql);
};

const postLogradouro= (cep, uf, cidade, bairro, logradouro, numero, regiao) => {
    const instrucaoSql = `
        INSERT INTO logradouro (cep, estado, cidade, bairro, logradouro, numLogradouro, regiao_cidade) VALUES 
            ('${cep}', '${uf}', '${cidade}', '${bairro}', '${logradouro}', '${numero}', '${regiao}')
    `;
    
    return database.executar(instrucaoSql);
};

module.exports = {getLogradouro, postLogradouro};