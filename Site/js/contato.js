function sendEmail() {
    var checkResposta = ipt_mensagem1.checked;

    if(!checkResposta){
        return alert("Você precisa concordar com o envio da mensagem para enviar!");
    }
    // dps guardar isso em um .env
    // https://app.elasticemail.com/login?_gl=1*6r0n63*_gcl_au*MTMzOTQzNzY2NC4xNzI4MzM3NDkw*FPAU*MTMzOTQzNzY2NC4xNzI4MzM3NDkw*_ga*MTg3Nzk0OTg0MS4xNzI4MzM3NDUz*_ga_9GFVDHZ5M5*MTcyODMzNzQ1My4xLjEuMTcyODMzNzkzOS41Mi4wLjA.*_ga_MZLQS12D2G*MTcyODMzNzQ1Mi4xLjEuMTcyODMzNzkzOS4wLjAuMTE5MzI1NDQxNg..
    // O link acima da acesso ao site onde tem tudo sobre as credenciais e senhas, porém já configurei tudo
    var email = "contatosinalverde@outlook.com";
    var senha = "97B3BED6C0ADA581700E4A0C05F8CD9CE607";
    var porta = 2525;

    var emailContactado = ipt_email.value;
    var nome = ipt_nome.value;
    var assunto = ipt_assunto.value;

    if(nome == '' || emailContactado == '' || assunto == '' || ipt_mensagem.value == ''){
        return alert("Preencha TODOS os campos corretamente!");
    }
    
    var mensagem = `
        Nome Usuário: ${nome}<br>
        Email: ${emailContactado}<br>
        Assunto: ${assunto}<br>
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