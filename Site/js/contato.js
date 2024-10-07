function sendEmail() {
    // fzr as validações para passar
    // dps guardar isso em um .env
    var email = "sinalver@exemplo.com";
    var senha = "SENHA";

    var emailContactado = ipt_email.value;
    var nome = ipt_nome.value;
    var assunto = ipt_assunto.value;
    var mensagem = `
        Nome Usuário: ${nome}
        Email: ${emailContactado}
        Assunto: ${assunto}
        Mensagem: ${ipt_mensagem1.value}
    `;

    Email.send({
        Host: "smtp.elasticemail.com",
        Port:2525,
        Username: email,
        Password: "E111EAE60628B47135DF0FE69BF520F831CC",
        To: email,
        From: email,
        Subject:assunto,
        Body: mensagem
    })
    .then(function (message) {
        alert(message) // Mensagem de alerta no envio bem-sucedido do email
    });
}