function carregarEmpresas(){
    fetch(`/empresas`, { cache: 'no-store' })
    .then((response) => {
        if (response.ok) {
            response.json()
            .then((empresas) => {
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

function editarEmpresa(id){
    // TODO
}

function deletarEmpresa(id){
    // TODO
}