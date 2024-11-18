var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");


function buscarPelaEmpresa(req,res) {
    const empresaId = req.params.empresaId;

    
        usuarioModel.buscarPelaEmpresa(empresaId).then(resultado => {
            res.json(resultado);
        }).catch(e => {
            res.json(e);
        })
    
}

function editarPeloId(req, res){
    const userId = req.params.id;
    const nome = req.body.nome
    const cpf =  req.body.cpf
    const nivel_permissao =  req.body.nivel_permissao
    const cargo =  req.body.cargo
    const email =  req.body.email
    const senha =  req.body.senha
    const data_nascimento =  req.body.data_nascimento

    console.log(data_nascimento)

    
    usuarioModel.editarPeloId(nome, cpf, nivel_permissao, cargo, email, senha, data_nascimento, userId).then(resultado => {
        res.json(resultado)
    }).catch(e => {
        res.json({
            message: "Erro interno no servidor",
            error: e
        })
    })
}

function buscarPeloId(req,res){
    const usuarioId = req.params.id;
    usuarioModel.buscarPeloId(usuarioId).then(resultado => {
        res.json(resultado[0])
    }).catch(e => {
        res.json({
            message: "Erro Interno no servidor",
            error: e
        })
    })
}

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.status(200).json(resultadoAutenticar[0])
                        // aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                        //     .then((resultadoAquarios) => {
                        //         if (resultadoAquarios.length > 0) {
                        //             res.json({
                        //                 id: resultadoAutenticar[0].id,
                        //                 email: resultadoAutenticar[0].email,
                        //                 nome: resultadoAutenticar[0].nome,
                        //                 cpf: resultadoAutenticar[0].cpf,
                        //                 senha: resultadoAutenticar[0].senha,
                        //                 // aquarios: resultadoAquarios
                        //             });
                        //         } else {
                        //             res.status(204).json({ aquarios: [] });
                        //         }
                        //     })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    // console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var nivel = req.body.nivelServer;
    var cargo = req.body.cargoServer;
    var data = req.body.data_nascimento;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;
    var empresaId = req.body.empresaId;
    // var fkEmpresa = req.body.idEmpresaVincularServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (nivel == undefined) {
        res.status(400).send("Seu nivel de permissao esta como undefined")
    } else if (cargo == undefined){
        res.status(400).send("Seu cargo está como undefined")
    } else if ( data == undefined){
        res.status(400).send("Sua data está como undefined")
    }else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    // } else if (fkEmpresa == undefined) {
    //     res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, cpf, senha, cargo, nivel, data, empresaId)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar,
    buscarPelaEmpresa,
    buscarPeloId,
    editarPeloId
}