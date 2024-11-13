function carregarEmpresas(){
    fetch(`/empresas`, { cache: 'no-store' })
    .then((response) => {
        if (response.ok) {
            response.json()
            .then((empresas) => {
                let linhas = `<table>
                                <tr class="comeco-tr">
                                    <td>Nome</td>
                                    <td>Localidade</td>
                                    <td>Colaboradores</td>
                                    <td>Editar</td>
                                    <td>Excluir</td>
                                </tr>
                            </table>`
                console.warn(empresas);
                empresas.forEach((empresa) => {
                    linhas += `
                        <tr class="usuario-tab">
                            <td>${empresa.nome}</td>
                            <td>${empresa.localidade}</td>
                            <td>${empresas.colaboradores}</td>
                            <td><i onclick="editarEmpresa(${empresa.id})"  class='bx bx-edit-alt'></i></td>
                            <td><i onclick="deletarEmpresa(${empresa.id})" class='bx bx-trash'></i></td>
                        </tr>
                    `;
                });
                console.log(linhas);
                console.log(document.getElementById("tabela-empresa"));
                document.getElementById("tabela-empresa").querySelector("tbody").inneHTML = linhas;
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