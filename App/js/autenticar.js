let modal = modal_contato;

const infosColaboradores = [
    {
        nome:"admin",
        senha:"Admin123",
        nivel_permissao:0,
        email:"contatosinalverde@outlook.com"
    },
    {
        nome:"Carlos",
        senha:"Urubu#100",
        nivel_permissao:1,
        email:"carlos@email.com"
    }
];

function analisarEmail(email){
    var tamEmail = email.length;

    var isEnd = email.endsWith('.com') || email.endsWith('.br') || email.endsWith('.gov');

    var indiceEnd = email.indexOf('.com') || email.indexOf('.br') || email.indexOf('.gov') ;
    var indiceArroba = email.indexOf('@'); 
    var isArroba = email.includes('@') && indiceArroba < indiceEnd;

    if((tamEmail < 8 || tamEmail > 45) && !isEnd && !isArroba || email == ''){
        modal.showModal()
        return span_erro.innerText = "Insira um valor de email válido";
    }
    
    return true;
}

function analisarSenha(senha){
    if(senha == ''){
        modal.showModal()
        return span_erro.innerText = "Insira um valor de senha válido";
    }

    return true;
}

function autenticar(){
    var email = iptEmail.value;
    var senha = iptSenha.value;

    if(analisarEmail(email) && analisarSenha(senha)){
        var isEmail = false;
        var indexColaborador = undefined;

        // pd usar o .find ou o forEach
        for(var i = 0; i<infosColaboradores.length; i++){
            console.log(infosColaboradores[i].email);
            if(infosColaboradores[i].email == email){
                isEmail = true;
                indexColaborador = i;
            }
        }

        if(!isEmail || infosColaboradores[indexColaborador].senha != senha){
            modal.showModal()
            return span_erro.innerText = `Senha ou email incorretos`;
        }

        if(infosColaboradores[indexColaborador].nivel_permissao == 0){
            return location.href="./root/colaboradores.html";
        }

        return location.href="./cliente/dashboard.html";
    }
}

function closeModal(){
    modal.close()
}

