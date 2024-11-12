let modal = modal_contato;

const infosColaboradores = [
    {
        nome:"admin",
        senha:"Admin123",
        nivel_permissao:0,
        email:"contatosinalverde@outlook.com"
    },
    {
        nome:"Bisque",
        senha:"Urubu#100",
        nivel_permissao:1,
        email:"bisque@email.com"
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

    console.log(email, senha)

    // if(analisarEmail(email) && analisarSenha(senha)){
    //     var isEmail = false;
    //     var indexColaborador = undefined;

    //     // pd usar o .find ou o forEach
    //     for(var i = 0; i<infosColaboradores.length; i++){
    //         console.log(infosColaboradores[i].email);
    //         if(infosColaboradores[i].email == email){
    //             isEmail = true;
    //             indexColaborador = i;
    //         }
    //     }

        if (email == "" || senha == "") {
            alert("Credenciais não encontradas!")
            return false;
        }

        console.log("FORM LOGIN: ", email);
        console.log("FORM SENHA: ", senha);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NIVEL_USUARIO = json.nivel_permissao;
                    sessionStorage.CARGO_USUARIO = json.cargo;
                    sessionStorage.CPF_USUARIO = json.cpf;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id;
                    // sessionStorage.AQUARIOS = JSON.stringify(json.aquarios)
                    if (sessionStorage.NIVEL_USUARIO == 1 || sessionStorage.NIVEL_USUARIO == 2){
                    window.location = "../App/cliente/dashboard.html";
                    } else {
                        window.location = "../App/root/colaboradores.html";
                    }
                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
            console.log(json);
        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }

        // if(!isEmail || infosColaboradores[indexColaborador].senha != senha){
        //     modal.showModal()
        //     return span_erro.innerText = `Senha ou email incorretos`;
        // }

        // if(infosColaboradores[indexColaborador].nivel_permissao == 0){
        //     return location.href="./root/colaboradores.html";
        // }

        // return location.href="./cliente/dashboard.html";
    // }


function closeModal(){
    modal.close()
}

