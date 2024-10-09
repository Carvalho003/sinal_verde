var senhaCorreta = '';
var emailCorreto = '';

const infosColaboradores = [
    {
        nome:"admin",
        senha:"Admin123",
        nivel_permissao:0,
        email:"contatosinalverde@outlook.com"
    }
];

const CARACTERES_ESPECIAIS = /[^A-Za-z0-9]/;

function analisarEmail(){
    var email = iptEmail.value;

    var isEmailValidado = false;
    var tamEmail = email.length;

    var isEnd = email.endsWith('.com') || email.endsWith('.br') || email.endsWith('.gov');

    var indiceCom = email.indexOf('.com');
    var indiceBr = email.indexOf('.br');

    var indiceArroba = email.indexOf('@'); 
    var isArroba = email.includes('@') && (indiceArroba < indiceCom || indiceArroba < indiceBr);

    if((tamEmail < 8 || tamEmail > 45) && !isEnd && !isArroba || email == ''){
        return alert("Insira um valor de email válido");
    }

    isEmailValidado = true;
    emailCorreto = email;
    
    return isEmailValidado;
}

function analisarSenha(){
    var senha = iptSenha.value;

    var isSenhaValidado = false;
    var tamSenha = senha.length;

    var isEspecial = CARACTERES_ESPECIAIS.test(senha);

    var isMinuscula = false;
    var isMaiuscula = false;
    var isNum = false;        

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

    if(tamSenha < 8 && !isMinuscula && !isMaiuscula && !isEspecial && !isNum || senha == ''){
        return alert("Insira uma senha válida");
    }

    isSenhaValidado = true;
    senhaCorreta = senha;

    return isSenhaValidado;
}

function autenticar(){
    if(analisarEmail() && analisarSenha()){
        var isEmail = false;
        var indexColaborador = undefined;

        // pd usar o .find ou o forEach
        for(var i = 0; i<infosColaboradores.length; i++){
            console.log(infosColaboradores[i].email);
            if(infosColaboradores[i].email == emailCorreto){
                isEmail = true;
                indexColaborador = i;
            }
        }

        if(!isEmail){
            return alert(`Não foi possível encontrar o email ${emailCorreto}`);
        }

        if(infosColaboradores[indexColaborador].senha != senhaCorreta){
            return alert(`Senha incorreta`);
        }

        return location.href="./cliente/colaboradores.html";
    }
}