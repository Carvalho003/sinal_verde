let empresaId = 'null'

let modalErro = modal_contato;

let modalSucesso = document.getElementById('modal_sucesso');

const CARACTERES_ESPECIAIS = /[^A-Za-z0-9]/;
const CARACTERES_CEP = /^[0-9]{8}$/;

var dadosColaborador = {
    nome:'',
    cpf:'',
    nivel_permissao:'',
    cargo: '',
    email:'',
    senha:'',
    data_nascimento:''
};

var dadosEmpresa = {
    nome:'',
    cnpj:'',
    cep:'',
    num_logradouro: '',
    logradouro:'',
    bairro:'',
    regiao:'',
    cidade: '',
    uf: ''
};

function validarNome(nome){
    nome = nome.split(" ");
    if(nome.length < 2){
        modalErro.showModal()
        span_erro.innerText ="Valor do nome inválido";
        return false;
    }

    return true;
}

function validarCPF(cpf){
    if(cpf.length != 11){
        modalErro.showModal()
        span_erro.innerText = "Valor do cpf inválido";
        return false;
    }

    return true;
}

function validarData(data){
    var hoje = new Date();

    var dia = hoje.getDate();
    var mes = hoje.getMonth() + 1;
    var ano = hoje.getFullYear();

    hoje = `${ano}-${mes}-${dia}`;

    if(data == '' || data >= hoje){
        modalErro.showModal()
        span_erro.innerText = "Data inválida";
        return false;
    }

    return true;
}

function validarEmail(email){
    console.log(email)
    var tamEmail = email.length;
    var isEnd = email.endsWith('.com') || email.endsWith('.br') || email.endsWith('.gov');
    var indiceEnd = email.indexOf('.com') || email.indexOf('.br') || email.indexOf('.gov') ;
    var indiceArroba = email.indexOf('@'); 
    var isArroba = email.includes('@') && indiceArroba < indiceEnd;

    if((tamEmail < 8 || tamEmail > 45) && !isEnd && !isArroba || email == ''){
        modalErro.showModal()
        span_erro.innerText = "Insira um valor de email válido";
        return false;

    }

    return true;
}

function validarCargo(cargo){
    if(cargo == ''){
        modalErro.showModal()
        span_erro.innerText = "Insira um cargo válido";
        return false;
    }

    return true;
}

function validarSenha(senha, confirmacao){
    var tamSenha = senha.length;
    var isEspecial = CARACTERES_ESPECIAIS.test(senha);

    var isMinuscula = false;
    var isMaiuscula = false;
    var isNum = false;        

    // pd usar um forEach ou find
    for(var i = 0; i < tamSenha; i++){
        if(senha[i] == senha[i].toUpperCase()){
            isMaiuscula = true;
        }

        if(senha[i] == senha[i].toLowerCase()){
            isMinuscula = true;
        }

        if(Number(parseFloat(senha[i])) == senha[i]){
            isNum = true;
        }
    }

    if(tamSenha < 8 || !isMinuscula || !isMaiuscula || !isEspecial || !isNum || senha == ''){
        modalErro.showModal()
        span_erro.innerText = "Insira uma senha válida";
        return false;
    }

    if(senha !== confirmacao){
        modalErro.showModal()
        span_erro.innerText = "As senhas não batem";
        return false;
    }

    return true;
}

function cadastrarColaborador(){
    var nome = ipt_nome.value;
    var cpf = ipt_cpf.value;
    var data = ipt_data.value;
    var email = ipt_email.value;
    var cargo = ipt_cargo.value;
    var permissao = Number(slt_permissao.value);
    var senha = ipt_senha.value;
    var confirmacao = ipt_confirme.value;

    if(validarNome(nome) && validarCPF(cpf) && validarData(data) && validarEmail(email) && validarCargo(cargo) && validarSenha(senha, confirmacao)){
        // lançar os dados no banco de dados
        dadosColaborador = {
            nome:nome,
            cpf:cpf,
            nivel_permissao:permissao,
            cargo: cargo,
            email:email,
            senha:senha,
            data_nascimento:data,
            cadastro: null
        };
        document.getElementById('form_colaborador').reset()
        modalSucesso.showModal()
        span_sucesso.innerText = "Cadastro do Colaborador feito com sucesso!";
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nome,
            cpfServer: cpf,
            nivelServer: permissao,
            cargoServer: cargo,
            emailServer: email,
            senhaServer: senha,
            data_nascimento: data,
            empresaId: empresaId
        }),
    })
    .then(function (resposta) {
        console.log("resposta: ", resposta);
        
        if (resposta.ok) {
            //   mensagem_erro.innerHTML =
            //     "Cadastro realizado com sucesso! Redirecionando para tela de Login...";
            
            //   setTimeout(() => {
            //     window.location = "login.html";
            //   }, "2000");

            modalSucesso.showModal()
            span_sucesso.innerText = "Colaborador(a) cadastrado com sucesso!";
        } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
        }
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
    });
}



function validarEndereco(cep, num, regiao){
    if(cep == '' || !CARACTERES_CEP.test(cep)){
        modalErro.showModal()
        return span_erro.innerText = "Valor do CEP inválido";
    }

    if(isNaN(num) || num == 0){
        modalErro.showModal()
        return span_erro = "Valor do Número inválido";
    }

    if(regiao == ''){
        modalErro.showModal()
        span_erro.innerText = "Valor do Número inválido"
        return false;
    }

    return true;
}


function validarCNPJ(cnpj){
    if(cnpj.length != 14 || cnpj == ''){
        modalErro.showModal()
        span_erro.innerText = "Valor de CNPJ inválido";
        return false;
    }

    return true;
}

function cadastrarEmpresa(){
    var nome = ipt_nome.value;
    var bairro = ipt_bairro.value;

    var cnpj = ipt_cnpj.value;            
    var cep_sede = ipt_cep_sede.value;
    var regiao = ipt_regiao.value;
    var logradouro = ipt_logradouro.value;
    var numero_logr = Number(ipt_numero_logr.value);
    var cidade = ipt_cidade.value;
    var uf = ipt_uf.value;

    if(validarNome(nome) && validarEndereco(cep_sede, numero_logr, regiao) && validarCNPJ(cnpj)){
        dadosEmpresa = {
            nome:nome,
            cnpj:cnpj,
            cep:cep_sede,
            num_logradouro: numero_logr,
            logradouro:logradouro,
            bairro:bairro,
            regiao:regiao,
            cidade: cidade,
            uf: uf
        }

        // Enviando o valor da nova input
        fetch("/empresas/cadastrar", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosEmpresa),
        })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                //   mensagem_erro.innerHTML =
                //     "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                //   setTimeout(() => {
                //     window.location = "login.html";
                //   }, "2000");

                modalSucesso.showModal()
                span_sucesso.innerText = "Empresa Cadastrada com Sucesso!";
                document.getElementById('form_empresa').reset();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });
    }
}

function limparEndereco(){
    ipt_logradouro.value = '';
    ipt_cidade.value = '';
    ipt_uf.value = '';
    ipt_bairro.value = '';
}

function pesquisarCEP(cep){
    if(true){
        var script = document.createElement('script');

        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=callbackCEP';

        document.body.appendChild(script);
    }
}

function callbackCEP(conteudo) {
    console.log(conteudo);
    if (!("erro" in conteudo)) {
        ipt_logradouro.value = (conteudo.logradouro);
        ipt_cidade.value = (conteudo.localidade);
        ipt_uf.value = (conteudo.uf);
        ipt_bairro.value = (conteudo.bairro);
    } 
    else {
        modalErro.showModal()
        span_erro.innerText = "CEP não encontrado.";
        limparEndereco();
    }
}

function closeModalErro(){
    modalErro.close()
}

function closeModalSucesso(){
    modalSucesso.close()
}
  