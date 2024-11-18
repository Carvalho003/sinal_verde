
const database = require("../database/config");


const updateEmpresa = (nome, cnpj, empresaId) => {
    const sql = `UPDATE empresa SET nome = '${nome}', cnpj = '${cnpj}' WHERE id = ${empresaId}`;

    return database.executar(sql);
}

const getById = (empresaId) => {
    const sql = `SELECT e.nome AS nome, l.id as logrId, l.cidade AS cidade, l.bairro, e.cnpj, l.cep, l.regiao_cidade, l.logradouro, l.numLogradouro, l.uf,   e.id as id FROM empresa AS e  JOIN logradouro l ON e.logradouro_id = l.id LEFT JOIN usuario c ON c.empresa_id = e.id 
    WHERE e.id = ${empresaId}
    ORDER BY nome ASC`;
    return database.executar(sql)
}

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

module.exports = {
    getEmpresas,
    postEmpresa,
    getById,
    updateEmpresa
};