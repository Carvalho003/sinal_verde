var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT u.id, u.nome, u.cargo, u.dataNasc, u.cpf, u.email, u.senha, u.nivel_permissao, u.empresa_id, uf FROM usuario AS u
	        JOIN empresa AS e ON u.empresa_id = e.id
            JOIN logradouro AS l ON l.id = e.logradouro_id
            WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarPeloId (nome, cpf, nivel_permissao, cargo, email, senha, data_nascimento, userId){
    let sql = ``;
    if(senha != ""){
        sql = `UPDATE usuario SET nome = '${nome}',
        cpf = '${cpf}',
        nivel_permissao = ${nivel_permissao},
        cargo = '${cargo}',
        email = '${email}',
        senha = '${senha}',
        dataNasc = '${data_nascimento}'
        WHERE id = ${userId}
        `;
    }else{
        sql = `UPDATE usuario SET nome = '${nome}',
        cpf = '${cpf}',
        nivel_permissao = ${nivel_permissao},
        cargo = '${cargo}',
        email = '${email}',
        dataNasc = '${data_nascimento}'
        WHERE id = ${userId}
        `;
    }

    return database.executar(sql);


}

function buscarPeloId(usuarioId){
    const sql = `SELECT id, nome, cpf, dataNasc, email, cargo, 
    CASE
    WHEN nivel_permissao = 2
    THEN 'ROOT'
    WHEN nivel_permissao = 1
    THEN 'MASTER'
    ELSE 'COMUM' 
    END as nivel_usuario
    FROM usuario WHERE id = ${usuarioId}`;
    return database.executar(sql);
}

function buscarPelaEmpresa(empresaId){
    if(empresaId != 'undefined'){
    const sql = `SELECT id,nome, cargo, 
    CASE 
        WHEN nivel_permissao = 2 THEN 'ROOT'
        WHEN nivel_permissao = 1 THEN 'TODAS'
        WHEN nivel_permissao = 0 THEN 'COMUM'
        ELSE 'DESCONHECIDO'
    END AS permissao
FROM usuario
where empresa_id = ${empresaId}
ORDER BY nome ASC
`
return database.executar(sql);
    }else{
        const sql = `SELECT id,nome, cargo, 
        CASE 
            WHEN nivel_permissao = 2 THEN 'ROOT'
            WHEN nivel_permissao = 1 THEN 'TODAS'
            WHEN nivel_permissao = 0 THEN 'COMUM'
            ELSE 'DESCONHECIDO'
        END AS permissao
    FROM usuario
    WHERE empresa_id IS NULL
    ORDER BY nome ASC
    `
    return database.executar(sql);
}
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, cpf, senha, cargo, nivel, data, empresaId ) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, cpf, senha, cargo,  );
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, cargo, dataNasc, cpf, email, senha, nivel_permissao, empresa_id) VALUES ('${nome}', '${cargo}','${data}', '${cpf}', '${email}', '${senha}', '${nivel}', ${empresaId});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    buscarPelaEmpresa,
    buscarPeloId,
    editarPeloId
};
