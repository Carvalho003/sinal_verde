
var modal = document.getElementById("modal");

function searchModal() {
    modal.style.display = 'flex';
    modal.style.height = '662px;'
    modal.showModal();

    modal.innerHTML = `
    <div class="conteudo-modal">
        <div class="superior-modal">
            <div class="circulo-modal">
                <div class="imagem-lupa"></div>
            </div>
            <button onclick="fecharModal()" class="fecharModal">X</button>
        </div>
        <div class="inferior-modal">
            <div class="modal-search-superior">
                <span class="titulo-modal">Pesquisa</span>
                <input class="input-modal" oninput="teste()" id="ipt_teste">
            </div>
            <div class="lista-modal" style="display: none" id="div_lista">
                <div class="modal-search-lista">
                    <div class="modal-search-option">
                        <span class="modal-search-rua">Rua Maira Susano</span>
                        <span class="modal-search-bairro">São Miguel Paulista - ZL SP</span>
                    </div>
                    <button onclick="fecharModal()" class="botao-modal">Verificar</button>
                </div>
                <div class="modal-search-lista">
                    <div class="modal-search-option">
                        <span class="modal-search-rua">Rua alfredo dias</span>
                        <span class="modal-search-bairro">Guarulhos - ZL SP</span>
                    </div>
                    <button onclick="fecharModal()" class="botao-modal">Verificar</button>
                </div>
                <div class="modal-search-lista">
                    <div class="modal-search-option">
                        <span class="modal-search-rua">Avenida Cruzeiro do Sul</span>
                        <span class="modal-search-bairro">São Paulo - ZN SP</span>
                    </div>
                    <button onclick="fecharModal()" class="botao-modal">Verificar</button>
                </div>
            </div>
        </div>
            `;
}
// <div></div>
function infoModal() {
    modal.style.display = 'flex';
    modal.style.height = '450px';
    modal.showModal();
    modal.innerHTML = `
    <div class="conteudo-modal">
        <div class="superior-modal">
            <div class="circulo-modal">
                <div class="imagem-info"></div>
            </div>
            <button onclick="fecharModal()" class="fecharModal">X</button>
        </div>
        <div class="inferior-modal-info">
            <div class="esquerda-modal">
                <div class="quadro-info">
                    <span class="titulo-modal">Caso 1:</span>
                    <span class="texto-modal">Caso a linha do gráfico mantenha um padrão mais linear, sem muitas ondulações, quer dizer que esta via está confestionada. Assim como o <span style="color: #1DA426">Exemplo 1</span> ao lado:</span>
                </div>
                <div class="quadro-info">
                    <span class="titulo-modal">Caso 2</span>
                    <span class="texto-modal">Caso a linha do gráfico mantenha um padrão mais irregular, com muitas ondulações, quer dizer que esta via está livre. Assim como o <span style="color: #A41D1D">Exemplo 2</span> ao lado:</span>
                </div>
            </div>
            <div class="direita-modal">
                <canvas id="grafico-exemplo"></canvas>
            </div>
        </div>
    `;

    var horariosAtual = ['09:45', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30',];

    var valoresAtual = [200, 210, 210, 200, 220, 210, 220, 210, 220, 230, 225, 210];

    var valoresMAtual = [240, 310, 340, 370, 400, 370, 290, 240, 250, 255, 270, 280];

    const graficoBarras1 = document.getElementById('grafico-exemplo');

    new Chart(graficoBarras1, {
        type: 'line', // tipo do gráfico 
        data: { // data = todos os valores que serão colocados
            labels: horariosAtual, // array = vetores que serão utilizados na label
            datasets: [{
                label: 'Exemplo 1',
                backgroundColor: '#A41D1D',
                borderColor: '#A41D1D',
                data: valoresMAtual,
                borderWidth: 1
            }, {
                label: 'Exemplo 2',
                backgroundColor: '#1DA426',
                borderColor: '#1DA426',
                data: valoresAtual,
                borderWidth: 1
            }]
        },
        options: { // opções do formato do gráfico
            scales: {
                y: {
                    display: false,
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
                tension: 0.55,
            plugins:{
                title:{
                    display:false
                },
                legend:{
                    position:'top',
                    labels:{
                        boxHeight:3
                    }
                }
            }
        }
    });
}

function teste() { // FUNÇÃO DO INPUT DE PESQUISA
    var input = ipt_teste.value;

    if (input != '') {
        div_lista.style.display = 'flex';
    } else {
        div_lista.style.display = 'none';
    }
}

function fecharModal() {
    modal.style.display = 'none'
    modal.close();
    search_geral.button.onclick = "searchModal()"
    search_bairro.button.onclick = "bairroModal()"
    search_rua.button.onclick = "ruaModal()"
}

