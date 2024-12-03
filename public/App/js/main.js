
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
}

function teste() { // FUNÇÃO DO INPUT DE PESQUISA
    var inputVar = ipt_teste.value;
    var ufVar = sessionStorage.UF;
    var vetor_ruas2 = [];
    var mensagem = '';

    if (inputVar != '') {
        div_lista.style.display = 'flex';
        fetch("/logradouro/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputServer: inputVar,
                ufServer: ufVar
            })
        }).then(function (resposta) {
            console.log(resposta)
    
                resposta.json().then(json => {
                    console.log(json.lista );
                    var vetor = json.lista;
                    
                    for(var i = 0; i < vetor.length; i++) {
    
                        if(!vetor_ruas2.includes(vetor[i].Logradouro)) {
                            vetor_ruas2.push(vetor[i].Logradouro);
                            mensagem += `
                                <div class="modal-search-lista">
                                    <div class="modal-search-option">
                                        <span class="modal-search-rua">${vetor[i].Logradouro}</span>
                                        <span class="modal-search-bairro">${vetor[i].Bairro} - ${vetor[i].Regiao} ${vetor[i].Unidade}</span>
                                    </div>
                                    <button onclick="pesquisar('${vetor[i].id}', '${vetor[i].Bairro}')" class="botao-modal">Verificar</button>
                                </div>
                            `;
                        }
    
                        console.log(vetor[i].Logradouro);
    
                    }
    
                    div_lista.innerHTML = mensagem;
                });
    
        }).catch(function (erro) {
            console.log(erro);
        })
    
        return false;
    } else {
        div_lista.style.display = 'none';
    }
}

function fecharModal() {
    modal.style.display = 'none'
    modal.close();
}

function verficarAnimacaoes() {
    const divsModalAlerta = document.querySelectorAll('.alerta-modal');

    for(let i =0; i < divsModalAlerta.length; i++){
        console.log(divsModalAlerta[i])
        console.log(divsModalAlerta[i].style.animation)
        let arrayPalavrasNoAnimation = (divsModalAlerta[i].style.animation).split(' ');

        if(arrayPalavrasNoAnimation.includes('pulsar')){
            return false
        }
    }
    return true;
}

function pesquisar(id, bairro, infos, elemento) {
    
    if(infos){
        elemento.style.animation = 'none'

        if(verficarAnimacaoes()){
            alerta_atual.style.animation = 'none'
        }
       console.log(bairro)
       let options = document.getElementById('slt_bairro');
        let value = 0;

    for(let i =0; i < options.length; i ++){
        let texto = options[i].text
        let bairroTexto = texto.split('-')[0]
        bairroTexto = bairroTexto.replaceAll(' ', '');
        console.log(bairroTexto, bairro.replaceAll(' ', ''))
        if(bairroTexto == bairro.replaceAll(' ', '')){
            value = options[i].value
            console.log(options[i].value)
        }

        
        
        
    }
    options.value = value
    let arrayInfos = infos.split(',')
    let logradouro_selecionado = arrayInfos[2];
    let color = arrayInfos[3];
    let situacao = arrayInfos[4];

    // ['11', ' Vila Rosaria', ' Rua Maria Susano Polilo 516', ' #A41D1D', ' parado']
    alerta_atual.style.borderColor = color

    alerta_atual.innerHTML = `<span style="color: ${color}" id="div_alerta">${logradouro_selecionado} com <br>trânsito ${situacao} a 15 minutos</span>
                <i style="color: ${color};" class='bx bxs-bell-ring'></i>   
                <i style="color: ${color}" onclick="abrirAlertas()" class='bx bx-chevron-down'></i>`
    alerta_atual.style.display = 'flex';

    setTimeout(() => {
        console.log(logradouro_selecionado)
        let select_ruas = document.getElementById('slt_ruas')
        let valueDaRua = 0;
        for(let i =0; i < select_ruas.length; i++){
            let texto = select_ruas[i].text 
            console.log(texto)
            console.log(logradouro_selecionado)
            if(logradouro_selecionado.replaceAll(' ', '') == texto.replaceAll(' ', '')){
                console.log("caiu")
                valueDaRua = select_ruas[i].value
            }
        }
        select_ruas.value = valueDaRua
        trocarGrafico(valueDaRua)

    }, 400)
    buscarLogradouros(id);
    modal_alertas.style.display ='none'

    }else{
        var bairroVar = '';
    bairro = bairro.replaceAll(' ', '')
    console.log(bairro)
    console.log(vetor_bairro)
    bairroVar = vetor_bairro.indexOf(bairro);
    console.log(bairroVar)
    let options = document.getElementById('slt_bairro');
    let value = 0;

    for(let i =0; i < options.length; i ++){
        let texto = options[i].text
        let bairroTexto = texto.split('-')[0]
        bairroTexto = bairroTexto.replaceAll(' ', '');
        
        if(bairroTexto == bairro){
            value = options[i].value
            console.log(options[i].value)
        }

    }
    slt_bairro.value = value;


    buscarLogradouros(id);

    modal.style.display = 'none'
    modal.close();

    }
}