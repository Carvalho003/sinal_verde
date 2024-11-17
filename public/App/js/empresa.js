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
                            <td><i onclick="editarEmpresa(${usuario.id})"  class='bx bx-edit-alt'></i></td>
                            <td><i onclick="deletarEmpresa(${usuario.id})" class='bx bx-trash'></i></td>
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



function editarEmpresa(id){
    // TODO
}

function deletarEmpresa(id){
    // TODO
}