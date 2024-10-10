const CARACTERES_ESPECIAIS = /[^A-Za-z0-9]/;

function validarCampos(){
    var nome = ipt_nome.value;
    
    nome = nome.split(" ");
    if(nome.length < 2){
        return alert("Valor do nome inválido");
    }

    var cpf = ipt_cpf.value;
    if(cpf.length != 11){
        return alert("Valor do cpf inválido");
    }

    var data = ipt_data.value;
    var hoje = new Date();

    var dia = hoje.getDate();
    var mes = hoje.getMonth() + 1;
    var ano = hoje.getFullYear();

    hoje = `${ano}-${mes}-${dia}`;

    if(data == '' || data >= hoje){
        return alert("Data inválida");
    }

    var email = ipt_email.value;

    var tamEmail = email.length;
    var isEnd = email.endsWith('.com') || email.endsWith('.br') || email.endsWith('.gov');
    var indiceEnd = email.indexOf('.com') || email.indexOf('.br') || email.indexOf('.gov') ;
    var indiceArroba = email.indexOf('@'); 
    var isArroba = email.includes('@') && indiceArroba < indiceEnd;

    if((tamEmail < 8 || tamEmail > 45) && !isEnd && !isArroba || email == ''){
        return alert("Insira um valor de email válido");
    }

    isEmailValidado = true;
    emailCorreto = email;

    var cargo = ipt_cargo.value;

    if(cargo == ''){
        return alert("Insira um cargo válido");
    }

    var permissao = Number(slt_permissao.value);
    var senha = ipt_senha.value;

    
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

    var confirmarSenha = ipt_confirme.value;

    if(senha !== confirmarSenha){
        return alert("As senhas não batem");
    }

    colaborador = {
        nome:nome,
        cpf:cpf,
        nivel_permissao:permissao,
        cargo: cargo,
        email:email,
        senha:senha,
        data_nascimento:data
    }
    console.log(colaborador);
    return alert("cadastrado com sucesso!");
}