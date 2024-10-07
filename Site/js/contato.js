function sendEmail() {
    var checkResposta = ipt_mensagem1.checked;

    if(!checkResposta){
        return alert("Você precisa concordar com o envio da mensagem para enviar!");
    }
    // dps guardar isso em um .env
    var email = "sinalver@exemplo.com";
    var senha = "SENHA";
    var porta = 2525;

    var emailContactado = ipt_email.value;
    var nome = ipt_nome.value;
    var assunto = ipt_assunto.value;

    if(nome == '' || emailContactado == '' || assunto == '' || ipt_mensagaem.value){
        return alert("Preencha TODOS os campos corretamente!");
    }
    
    
    var mensagem = `
        Nome Usuário: ${nome}
        Email: ${emailContactado}
        Assunto: ${assunto}
        Mensagem: ${ipt_mensagem.value}
    `;

    Email.send({
        Host: "smtp.elasticemail.com",
        Port: porta,
        Username: email,
        Password: senha,
        To: email,
        From: email,
        Subject:assunto,
        Body: mensagem
    })
    .then(function (message) {
        alert(message) 
    });
}