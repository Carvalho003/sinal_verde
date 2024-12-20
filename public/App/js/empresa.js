function carregarEmpresas(){
    

    fetch(`/empresas`, { cache: 'no-store' })
    .then((response) => {
        if (response.ok) {
            response.json()
            .then((empresas) => {
                console.log(empresas)
                document.getElementById("tabela-empresa").innerHTML = "";
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
                            <td><i onclick="getEmpresaById(${empresa.id})"  class='bx bx-edit-alt'></i></td>
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

const getEmpresaById = (id) => {
    if(id == undefined){
        id = sessionStorage.EMPRESA_ID
    }
    fetch(`/empresas/${id}`).then(res => res.json()).then(res => {
        console.log(res)
        let url = window.location.href;
        url = url.split('/');
        url = url[url.length -1];

        if(url == "empresa.html"){
            document.getElementById('btn_cadastrar').onclick = () => putEmpresa(res.id, res.logrId);
            document.getElementById('btn_cancelar').onclick = () => restoreButtonsEmpresa();
            document.getElementById('icon_fechar').onclick = () => restoreButtonsEmpresa();
            fillModalEmpresa(res)
            abrirModal()
        }else{
            span_empresa_local.innerText = `${res.nome} - ${res.cidade}`
        }
    }).catch(e => {
        console.log(e)
    })
}

function fillModalEmpresa (data) {
    ipt_nome.value = data.nome;
    ipt_bairro.value = data.bairro;
    ipt_cnpj.value = data.cnpj;            
    ipt_cep_sede.value = (data.cep).replaceAll("-", "");
    ipt_regiao.value = data.regiao_cidade;
    ipt_logradouro.value = data.logradouro;
    ipt_numero_logr.value = data.numLogradouro;
    ipt_cidade.value = data.cidade;
    ipt_uf.value = data.uf;

}

function putEmpresa(empresaId, logrId){
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
        console.log(dadosEmpresa)

        fetch(`/empresas/${empresaId}/${logrId}`, {
            method: "PUT",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosEmpresa),
        }).then(res => res.json()).then(res => {
            console.log(res)
            modalSucesso.showModal()
            span_sucesso.innerText = "Dados atualizados com sucesso!";
            restoreButtonsEmpresa()
            carregarEmpresas(empresaId)
        }).catch(e => {
            console.log(e)
        })

    }
}

function restoreButtonsEmpresa (){
    document.getElementById('btn_cadastrar').onclick = () => cadastrarEmpresa();
    document.getElementById('btn_cancelar').onclick = () => closeModal();
    document.getElementById('close-modal').onclick = () => closeModal();
    ipt_nome.value = "";
    ipt_bairro.value = "";
    ipt_cnpj.value = "";            
    ipt_cep_sede.value = "";
    ipt_regiao.value = "";
    ipt_logradouro.value = "";
    ipt_numero_logr.value = "";
    ipt_cidade.value = "";
    ipt_uf.value = "";

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