function validarSessaoRooot(){
    let nivel = sessionStorage.NIVEL_USUARIO;
    let nome = sessionStorage.NOME_USUARIO;

    if (nome != "Root" && nivel != 2) {
        sessionStorage.clear();
        return window.location = "../login.html";
    } 

    nome_usuario.innerText = nome;
}

function validarSessaoMaster(){
    let nivel = sessionStorage.NIVEL_USUARIO;
    let nome = sessionStorage.NOME_USUARIO;

    if((nome == "" || nome == undefined) || (nivel == "" || nivel != 1)){
        sessionStorage.clear();
        return window.location = "../login.html";
    }

    nome_usuario.innerText = nome;
}

function validarSessaoComum(){
    let nivel = sessionStorage.NIVEL_USUARIO;
    let nome = sessionStorage.NOME_USUARIO;

    if((nome == "" || nome == undefined) || (nivel == "" || nivel != 0)){
        sessionStorage.clear();
        return window.location = "../login.html";
    }

    nome_usuario.innerText = nome;
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}