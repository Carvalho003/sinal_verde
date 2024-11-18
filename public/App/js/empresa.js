function carregarEmpresas(){
    fetch(`/empresas`, { cache: 'no-store' })
    .then((response) => {
        if (response.ok) {
            response.json()
            .then((empresas) => {
                console.log(empresas)
                let tabela = document.createElement("table");
                console.log(tabela);
                let linhas = `  <tr class="comeco-tr">
                                    <td>Nome</td>
                                    <td>Localidade</td>
                                    <td>Colaboradores</td>
                                    <td>Editar</td>
                                    <td>Excluir</td>
                                </tr>`

                empresas.forEach((empresa) => {
                    linhas += `
                        <tr class="usuario-tab">
                            <td>${empresa.nome}</td>
                            <td>${empresa.localidade}</td>
                            <td>${empresa.colaboradores}</td>
                            <td><i onclick="editarEmpresa(${empresa.id})"  class='bx bx-edit-alt'></i></td>
                            <td><i onclick="deletarEmpresa(${empresa.id})" class='bx bx-trash'></i></td>
                        </tr>
                    `;
                });
                document.getElementById("tabela-empresa").appendChild(tabela);
                tabela.innerHTML = linhas;
                
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch((error) => {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function carregarEmpresasColaboradores(){
    
    fetch(`/empresas`, { cache: 'no-store' })
    .then((response) => {
        if (response.ok) {
            response.json()
            .then((empresas) => {
                console.log(empresas)
                let tabela = document.createElement("table");
                console.log(tabela);
                let linhas = `<option value="null">Selecione Uma Empresa</option>`;

                empresas.map(empresa => {
                    linhas += `<option value="${empresa.id}">${empresa.nome}</option>`;
                })
                document.getElementById("slt_empresa").innerHTML = linhas;
                
                
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch((error) => {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function putUsuario(userId) {

    var nome = ipt_nome.value;
    var cpf = ipt_cpf.value;
    var data = ipt_data.value;
    console.log(data)
    var email = ipt_email.value;
    var cargo = ipt_cargo.value;
    var permissao = Number(slt_permissao.value);
    var senha = ipt_senha.value;
    var confirmacao = ipt_confirme.value;
    if(validarNome(nome) && validarCPF(cpf) && validarData(data) && validarEmail(email) && validarCargo(cargo)){
        // lançar os dados no banco de dados
        if(senha != ""){
            if(!validarSenha(senha, confirmacao)){
        
                span_erro.innerText = "Senha inválida";
                return modalErro.showModal()

            }
        }
        dadosColaborador = {
            nome:nome,
            cpf:cpf,
            nivel_permissao:permissao,
            cargo: cargo,
            email:email,
            senha:senha,
            data_nascimento:data,
            
        };
        
        fetch(`/usuarios/single/${userId}`, {
            method: "PUT",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosColaborador),
        }).then(res => res.json()).then(res => {
            console.log(res)
            modalSucesso.showModal()
            span_sucesso.innerText = "Dados atualizados com sucesso!";
            restoreButtons()
            carregarColaboradores(sessionStorage.EMPRESA_ID);
        }).catch(e => {
            console.log(e)
        })


        
    }

}


function carregarColaboradores(empresaIdAtual){
    empresaId = empresaIdAtual
    document.getElementById("tab-colab").innerHTML= "";

    fetch(`/usuarios/${empresaId}`, { cache: 'no-store' })
    .then((response) => {
        if (response.ok) {
            response.json()
            .then((usuarios) => {
                let tabela = document.createElement("table");
                console.log(usuarios);

                
                let linhas = `  <tr class="comeco-tr">
                                    <td>Nome</td>
                                    <td>Cargo</td>
                                    <td>Permissão</td>
                                    <td>Editar</td>
                                    <td>Excluir</td>
                                </tr>`
                                
                                console.log(usuarios.length)
                if(usuarios.length > 0){
                usuarios.forEach((usuario) => {
                    linhas += `
                        <tr class="usuario-tab">
                            <td>${usuario.nome}</td>
                            <td>${usuario.cargo}</td>
                            <td>${usuario.permissao}</td>
                            <td><i onclick="editarColaborador(${usuario.id})"  class='bx bx-edit-alt'></i></td>
                            <td><i onclick="deletarColaborador(${usuario.id})" class='bx bx-trash'></i></td>
                        </tr>
                    `;
                });
                }else{
                    linhas += `<tr class="usuario-tab">Essa empresa não tem colaboradores cadastrados</tr>`
                }
                document.getElementById("tab-colab").appendChild(tabela);
                tabela.innerHTML = linhas;
                
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch((error) => {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function restoreButtons(){
    document.getElementById('btn_salvar').onclick = () => cadastrarColaborador();
    document.getElementById('btn_cancelar').onclick = () => closeModal();
    document.getElementById('btn_cancelar').onclick = () => closeModal();
    ipt_nome.value = "";
    ipt_cpf.value = "";
    ipt_data.value = "";
    ipt_email.value = "";
    ipt_cargo.value = "";
    closeModal();
}

function editarColaborador(id){
    fetch(`/usuarios/single/${id}`,  { cache: 'no-store' }).then(res => res.json()).then(res =>{
        console.log(res)
        ipt_nome.value = res.nome
        ipt_cpf.value = res.cpf
        ipt_data.value = res.dataNasc
        ipt_email.value = res.email
        ipt_cargo.value = res.cargo
        document.getElementById('btn_salvar').onclick = () => putUsuario(res.id);
        document.getElementById('btn_cancelar').onclick = () => restoreButtons();
        document.getElementById('close-modal').onclick = () => restoreButtons();
        console.log(slt_permissao);
        let options = slt_permissao.querySelectorAll('option');
        console.log(options)
        
        options.forEach(opcao => {
            
            
            if((opcao.innerText).toUpperCase() == res.nivel_usuario){
                opcao.selected = true;
            }
        })
        
        
        abrirModal();
        console.log(res)
    }).catch(e => {
        console.log(e)
    })
}

function deletarColaborador(id){

}

function editarEmpresa(id){
    // TODO
}

function deletarEmpresa(id){
    // TODO
}