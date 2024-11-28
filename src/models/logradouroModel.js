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

const buscarkpi1= (idEmpresa) => {
    const instrucaoSqlKpi1 = `
        SELECT count(bairro) AS bairro FROM logradouro WHERE cidade = (SELECT cidade as bairros FROM empresa AS e JOIN logradouro AS l ON e.logradouro_id = l.id WHERE e.id = ${idEmpresa});
    `;

    return database.executar(instrucaoSqlKpi1)
}

const buscarkpi2= (idEmpresa) => {
    const instrucaoSqlKpi2 = `
        SELECT count(logradouro) AS Logradouro FROM logradouro WHERE cidade = (SELECT cidade as bairros FROM empresa AS e JOIN logradouro AS l ON e.logradouro_id = l.id WHERE e.id = ${idEmpresa});
    `;

    return database.executar(instrucaoSqlKpi2)
}

const selectBairro= (idEmpresa) => {
    const instrucaoSql_slt_bairro = `
        SELECT bairro, regiao_cidade AS Regiao, uf AS Unidade, cidade AS Cidade FROM logradouro AS l JOIN empresa AS e ON e.logradouro_id = l.id WHERE uf = (SELECT uf as bairros FROM empresa AS e JOIN logradouro AS l ON e.logradouro_id = l.id WHERE e.id = ${idEmpresa});
    `;

    return database.executar(instrucaoSql_slt_bairro)
}

const selectRuas= (nomeBairro, nomeCidade) => {
    const instrucaoSql_slt_bairro = `
    SELECT logradouro AS Logradouro FROM logradouro WHERE bairro = '${nomeBairro}' AND cidade = '${nomeCidade}';
    `;

    return database.executar(instrucaoSql_slt_bairro)
}

module.exports = {getLogradouro, postLogradouro, updateLogradouro, buscarkpi1, buscarkpi2, selectBairro, selectRuas};