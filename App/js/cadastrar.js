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
        return alert("Valor do nome inválido");
    }

    return true;
}

function validarCPF(cpf){
    if(cpf.length != 11){
        return alert("Valor do cpf inválido");
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
        return alert("Data inválida");
    }

    return true;
}

function validarEmail(email){
    var tamEmail = email.length;
    var isEnd = email.endsWith('.com') || email.endsWith('.br') || email.endsWith('.gov');
    var indiceEnd = email.indexOf('.com') || email.indexOf('.br') || email.indexOf('.gov') ;
    var indiceArroba = email.indexOf('@'); 
    var isArroba = email.includes('@') && indiceArroba < indiceEnd;

    if((tamEmail < 8 || tamEmail > 45) && !isEnd && !isArroba || email == ''){
        return alert("Insira um valor de email válido");
    }

    return true;
}

function validarCargo(cargo){
    if(cargo == ''){
        return alert("Insira um cargo válido");
    }

    return true;
}

function validarSenha(senha, confimacao){
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
        return alert("Insira uma senha válida");
    }

    if(senha !== confirmacao){
        return alert("As senhas não batem");
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
            data_nascimento:data
        };
        alert("Cadastro do Colaborador feito com sucesso!");
    }
}

function validarEndereco(cep, num, regiao){
    if(cep == '' || !CARACTERES_CEP.test(cep)){
        return alert("Valor do CEP inválido");
    }

    if(isNaN(num) || num == 0){
        return alert("Valor do Número inválido");
    }

    if(regiao == ''){
        return alert("Valor do Número inválido");
    }

    return true;
}


function validarCNPJ(cnpj){
    if(cnpj.length != 14 || cnpj == ''){
        return alert("Valor de CNPJ inválido");
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
    }
}

function limparEndereco(){
    ipt_logradouro.value = '';
    ipt_cidade.value = '';
    ipt_uf.value = '';
    ipt_bairro.value = '';
}

function pesquisarCEP(cep){
    if(validarCEP){
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
        alert("CEP não encontrado.");
        limparEndereco();
    }
}
  