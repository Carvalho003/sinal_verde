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
        SELECT  bairro AS bairro FROM logradouro WHERE cidade = (SELECT cidade as bairros FROM empresa AS e JOIN logradouro AS l ON e.logradouro_id = l.id WHERE e.id = ${idEmpresa} group by bairros) group by bairro ;
    `;

    return database.executar(instrucaoSqlKpi1)
}

const buscarkpi2= (idEmpresa) => {
    const instrucaoSqlKpi2 = `
        SELECT COUNT(logradouro) AS Logradouro FROM logradouro WHERE cidade = 'São Paulo';
    `;

    return database.executar(instrucaoSqlKpi2)
}

const selectBairro= (idEmpresa) => {
    const instrucaoSql_slt_bairro = `
        SELECT l.id, bairro, regiao_cidade AS Regiao, uf AS Unidade, cidade AS Cidade FROM logradouro AS l JOIN empresa AS e ON e.logradouro_id = l.id WHERE cidade = (SELECT cidade as bairros FROM empresa AS e JOIN logradouro AS l ON e.logradouro_id = l.id WHERE e.id = ${idEmpresa}) ;
    `;

    return database.executar(instrucaoSql_slt_bairro)
}

const selectRuasMonitoradas= (idEmpresa) => {
    const instrucaoSql_slt_bairro = `
        SELECT l.id,  concat(logradouro, ' ', numLogradouro) as logradouro ,l.bairro, es.id as sensorId FROM logradouro AS l JOIN empresa AS e ON e.logradouro_id = l.id
        JOIN equipamento_sensor es ON es.logradouro_id = l.id WHERE cidade = (SELECT cidade as bairros FROM empresa AS e JOIN logradouro AS l ON e.logradouro_id = l.id WHERE e.id = ${idEmpresa}) ;
    `;

    return database.executar(instrucaoSql_slt_bairro)
}


const selectRuas= (nomeBairro, nomeCidade, bairroId) => {
    console.log(nomeBairro);
    console.log(bairroId)
    const instrucaoSql_slt_bairro = `
    SELECT es.id AS sensor_id,logradouro.id, concat(logradouro, ' ', numLogradouro) AS Logradouro FROM logradouro 
    JOIN equipamento_sensor es
    ON es.logradouro_id = logradouro.id
    WHERE bairro = (SELECT bairro FROM logradouro WHERE id = ${bairroId}) AND cidade = (SELECT cidade FROM logradouro WHERE id = ${bairroId}) ;
    `;

    return database.executar(instrucaoSql_slt_bairro)
}

const search= (input, uf) => {
    const instrucaoSql_slt_bairro = `
        SELECT id ,bairro AS Bairro, uf AS Unidade, logradouro AS Logradouro, regiao_cidade AS Regiao, Cidade FROM logradouro WHERE logradouro LIKE '%${input}%' AND uf = '${uf}';
    `;

    return database.executar(instrucaoSql_slt_bairro)
}

module.exports = {getLogradouro, postLogradouro, updateLogradouro, buscarkpi1, buscarkpi2, selectBairro, selectRuas, search, selectRuasMonitoradas};