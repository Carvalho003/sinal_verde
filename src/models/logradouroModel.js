const database = require("../database/config");

const getLogradouro = (cep, numero) =>{
    const instrucaoSql = `
        SELECT id FROM logradouro WHERE cep = '${cep}' AND numLogradouro = '${numero}';
    `;
    
    return database.executar(instrucaoSql);
};

const updateLogradouro = (cep, estado, cidade, bairro, logradouro, numLogradouro, uf, regiao_cidade, logrId) => {
    const sql = `UPDATE logradouro SET cep = '${cep}',
    estado = '${estado}',
    cidade = '${cidade}',
    bairro = '${bairro}',
    logradouro = '${logradouro}',
    numLogradouro = '${numLogradouro}',
    uf = '${uf}',
    regiao_cidade = '${regiao_cidade}'
    WHERE id = ${logrId}`;
    console.log(sql)
    return database.executar(sql)
}

const postLogradouro= (cep, uf, cidade, bairro, logradouro, numero, regiao) => {
    const instrucaoSql = `
        INSERT INTO logradouro (cep, estado, cidade, bairro, logradouro, numLogradouro, regiao_cidade) VALUES 
            ('${cep}', '${uf}', '${cidade}', '${bairro}', '${logradouro}', '${numero}', '${regiao}')
    `;
    
    return database.executar(instrucaoSql);
};

module.exports = {getLogradouro, postLogradouro, updateLogradouro};