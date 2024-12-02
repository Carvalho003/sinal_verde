let grafico_atual
let tipoGrafico = 'ultimaHora'
let sensorAtual;

let lista_ids_ruas = []

const getDadosDozeHorasBairro = async(lista_de_ids) =>{
    let in_ids = ''
    for(let i =0; i< lista_de_ids.length; i++){
      
        if(i == (lista_de_ids.length -1)){
            in_ids += lista_de_ids[i];
        }else{
            in_ids += `${lista_de_ids[i]}, `;
        }
    }

    console.log(in_ids)

    const response = await fetch(`http://localhost:3333/sensor/twelve`, {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            in_ids: in_ids
        }),
    })

    const json = await response.json();
    console.log(json)
    return json

}

const getDadosUltimaHoraBairro = async(lista_de_ids) =>{
    let in_ids = ''
    for(let i =0; i< lista_de_ids.length; i++){
      
        if(i == (lista_de_ids.length -1)){
            in_ids += lista_de_ids[i];
        }else{
            in_ids += `${lista_de_ids[i]}, `;
        }
    }

    console.log(in_ids)

    const response = await fetch(`http://localhost:3333/sensor/hour`, {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            in_ids: in_ids
        }),
    })

    const json = await response.json();
    console.log(json)
    return json

}


const getDadosSeisHorasBairro = async(lista_de_ids) =>{
    let in_ids = ''
    for(let i =0; i< lista_de_ids.length; i++){
      
        if(i == (lista_de_ids.length -1)){
            in_ids += lista_de_ids[i];
        }else{
            in_ids += `${lista_de_ids[i]}, `;
        }
    }

    console.log(in_ids)

    const response = await fetch(`http://localhost:3333/sensor/six`, {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            in_ids: in_ids
        }),
    })

    const json = await response.json();
    console.log(json)
    return json

}

const getDadosUltimaHora = async(sensorId) => {
    const response = await fetch(`http://localhost:3333/sensor/hour/${sensorId}`)
    const json = await response.json()
    return json
    
}

const getDadosSeisHoras = async(sensorId) => {
    const response = await fetch(`http://localhost:3333/sensor/six/${sensorId}`)
    const json = await response.json()
    return json
    
}

const getDadosDozeHoras = async(sensorId) => {
    const response = await fetch(`http://localhost:3333/sensor/twelve/${sensorId}`)
    const json = await response.json()
    return json
    
}

const trocarTipoGrafico = (tipo) => {
    if(tipo == 1){
        tipoGrafico = 'ultimaHora'
        umaH.style.backgroundColor = '#1D6975';
        umaH.style.color = '#fff'
        seisH.style.backgroundColor = '#fff';
        seisH.style.color = '#000'
        dozeH.style.backgroundColor = '#FFF';
        dozeH.style.color = '#000000';

    }else if(tipo == 2){
        tipoGrafico = 'seisHoras'
        umaH.style.backgroundColor = '#fff';
        umaH.style.color = '#000'
        seisH.style.backgroundColor = '#1D6975';
        seisH.style.color = '#fff'
        dozeH.style.backgroundColor = '#FFF';
        dozeH.style.color = '#000000';
    }else{
        tipoGrafico = 'dozeHoras'
        umaH.style.backgroundColor = '#fff';
        umaH.style.color = '#000'
        seisH.style.backgroundColor = '#fff';
        seisH.style.color = '#000'
        dozeH.style.backgroundColor = '#1D6975';
        dozeH.style.color = '#fff';
    }
    trocarGrafico(sensorAtual)
}

async function trocarGrafico(sensorId){
    sensorAtual = sensorId
    var rua = slt_ruas.value;
    // var rua_selecionada = a[rua];

    // if(rua_selecionada == undefined) {
    //     rua_selecionada = 'Teste';
    // }
    let sltRuas = document.getElementById('slt_ruas');
    let opcoes = sltRuas.options;
    let rua_selecionada = opcoes[opcoes.selectedIndex].text
    
    spn_grafico.innerHTML = rua_selecionada;

    grafico_atual.data.datasets[0].label = rua_selecionada;
    let dadosUltimaHora
    let dadosUltimaHoraBairro
    if(tipoGrafico == 'ultimaHora'){
         dadosUltimaHora = await getDadosUltimaHora(sensorId);
         dadosUltimaHoraBairro = await getDadosUltimaHoraBairro(lista_ids_ruas);

    }else if(tipoGrafico == 'seisHoras'){
        dadosUltimaHora = await getDadosSeisHoras(sensorId)
        dadosUltimaHoraBairro = await getDadosSeisHorasBairro(lista_ids_ruas);
    }else{
        dadosUltimaHora = await getDadosDozeHoras(sensorId)
        dadosUltimaHoraBairro = await getDadosDozeHorasBairro(lista_ids_ruas);

    }
    console.log(dadosUltimaHora)
    let  lista_valores = dadosUltimaHora.dados;
    let lista_valores2 = dadosUltimaHoraBairro.dados;
    
    

    grafico_atual.data.datasets[0].data = lista_valores;
    grafico_atual.data.datasets[1].data = lista_valores2;
    grafico_atual.data.labels = dadosUltimaHora.horarios
    grafico_atual.update()
    
}

const getDadosRuasCongestionadas = (lista_de_ids) => {

    let in_ids = ''
    for(let i =0; i< lista_de_ids.length; i++){
      
        if(i == (lista_de_ids.length -1)){
            in_ids += lista_de_ids[i];
        }else{
            in_ids += `${lista_de_ids[i]}, `;
        }
    }


     fetch(`http://localhost:3333/sensor/bairro`, {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            in_ids: in_ids
        }),
    }).then(res => res.json()).then(res => {
        console.log(res)
        carregarGraficoDonut(res)
    })

}

let grafico_donut;
const carregarGraficoDonut = async (dados) => {

const graficoSetor = document.getElementById('setor'); // const == variável constante

    // se tiver [] é vetor, se tiver {} é json = juntar inúmeras propriedades dentro de um grupo

    span_porcentagem.innerText = (dados.porcentagemCongestionadas).toFixed(2) + "%";
    let porcentagem = dados.porcentagemCongestionadas;
    let color = "#1DA426"
    if(porcentagem > 60){
        color = '#A41D1D'
    }else if (porcentagem > 15){
        color = '#FF5733'
    }

    span_porcentagem.style.color = color

    if(grafico_donut){
        grafico_donut.destroy()
    }
      grafico_donut = new Chart(graficoSetor, {
        type: 'doughnut', // tipo do gráfico 
        data: { // data = todos os valores que serão colocados
            datasets: [{ // métricas do gráfico = linha
                backgroundColor: ['#A41D1D', '#1DA426'],
                borderColor: ['#A41D1D', '#1DA426'],
                data: [dados.ruasCongestionadas, dados.ruasLivres], // valores do gráfico
                borderWidth: 1 // largura da borda do gráfico
            }]
        },
        options: { // opções do formato do gráfico
            plugins:{
                customCanvasBackgroundColor: {
                    color: '#FFFFFF',
                },
                tooltip: {
                    enable: false
                }
            },
            cutout: '70%',
            responsive: true
        }/*,
            plugins: {
                id: 'grafico-setor',
                beforeDraw: (chart) => {
                    const largura = chart.width;
                    const altura = chart.height;
                    const ctx = chart.ctx;
                    ctx.restore();
                    const fontSize = 40;
                    ctx.font = `${fontSize}em sans-serif`;
                    ctx.textBaseline = "middle";

                    const mensagem = "68%";
                    const coordenadaX = Math.round((largura - ctx.measureText(mensagem).largura) / 2);
                    const coordenadaY = altura / 2;

                    ctx.fillStyle = "#8b0000";
                    ctx.fillText(mensagem, coordenadaX, coordenadaY);
                    ctx.save();
                }
            }*/
    });

}







var idEmpresaVar = sessionStorage.EMPRESA_ID;

function carregarkpi1() {
    aparecer1h();
    console.log('to no carregarkpi1')
    var qtd = 0;

    console.log(idEmpresaVar);

    fetch("/logradouro/kpi1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEmpresaServer: idEmpresaVar
        })
    }).then(function (resposta) {
        console.log(resposta)

            resposta.json().then(json => {
                console.log(json)
                console.log(json.logradouro);
                qtd = json.logradouro;
                qtd_bairros.innerHTML = `${qtd}`;
                carregarkpi2();
            });

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}


function carregarkpi2() {
    console.log('to no carregarkpi2')
    var qtd = 0;

    fetch("/logradouro/kpi2", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEmpresaServer: idEmpresaVar
        })
    }).then(function (resposta) {
        console.log(resposta)

            resposta.json().then(json => {
                console.log(json.logradouro);
                qtd = json.logradouro;
                qtd_ruas.innerHTML = `${qtd}`;
                mostrarBairros();
            });

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

var vetor_bairro = [];
var vetor_cidade = [];
function aparecer1h() {
    var graficoBarras = document.getElementById('grafico_linha1');
    grafico_linha1.style.display = 'flex';
    grafico_linha6.style.display = 'none';
    grafico_linha12.style.display = 'none';

    umaH.style.backgroundColor = '#1D6975';
    umaH.style.color = '#FFFFFF'
    seisH.style.backgroundColor = '#FFF';
    seisH.style.color = '#000000'
    dozeH.style.backgroundColor = '#FFF';
    dozeH.style.color = '#000000';
    
    // Horários:
    var horariosAtual = ['09:45', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30',];

    // Valores:
    var valoresAtual = [200, 300, 350, 400, 380, 360, 280, 240, 220, 230, 290, 300];
        
    // Valores Médio:
    var valoresMAtual = [240, 310, 340, 370, 400, 370, 290, 240, 250, 255, 270, 280];
    
    grafico_atual = new Chart(graficoBarras, {
        type: 'line', // tipo do gráfico 
        data: { // data = todos os valores que serão colocados
            labels: [], // array = vetores que serão utilizados na label
            datasets: [{ // métricas do gráfico = linha
                label: 'Avenida 1', // nome da linha
                backgroundColor: '#1DA426',
                borderColor: '#1DA426',
                data: [], // valores do gráfico
                borderWidth: 1 // largura da borda do gráfico
            }, {
                label: 'Média do bairro',
                backgroundColor: '#A41D1D',
                borderColor: '#A41D1D',
                data: [],
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



var vetor_bairro = [];
var vetor_cidade = [];

function mostrarBairros() {
    var vetor = '';
    var mensagem = '';

    fetch("/logradouro/select_bairro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEmpresaServer: idEmpresaVar
        })
    }).then(function (resposta) {
        console.log(resposta)

            resposta.json().then(json => {
                console.log(json.lista);
                vetor = json.lista;
                for(var i = 0; i < vetor.length; i++) {
                    if(!vetor_bairro.includes(vetor[i].bairro)) {
                        vetor_bairro.push(vetor[i].bairro);
                        vetor_cidade.push(vetor[i].Cidade);

                        mensagem += `
                            <option value="${vetor[i].id}">${vetor[i].bairro}  - ${vetor[i].Unidade} ${vetor[i].Cidade} ${vetor[i].Regiao} </option>
                        `;
                    }else{
                        console.log(vetor[i])
                    }
                }
                console.log(vetor_bairro);

                slt_bairro.innerHTML = mensagem;

                buscarLogradouros(vetor[0].id)
            });

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

var vetor_rua = [];

function buscarLogradouros(id) {
    var numero_vetor = slt_bairro.value;

    console.log(id)
    console.log(vetor_bairro, vetor_cidade)
    var nomeBairroVar = vetor_bairro[numero_vetor];
    var nomeCidadeVar = vetor_cidade[numero_vetor];
    var mensagem = '';

    bairro_kpi.innerHTML = nomeBairroVar;

    console.log(`${nomeBairroVar} ${nomeCidadeVar}`);

    console.log(vetor_bairro);
    
    fetch(`/logradouro/${id}/select_ruas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeBairroServer: nomeBairroVar,
            nomeCidadeServer: nomeCidadeVar
        })
    }).then(function (resposta) {
        console.log(resposta)

            resposta.json().then(json => {
                console.log(json.lista);
                var vetor = json.lista;
                lista_ids_ruas =[]
                for(var i = 0; i < vetor.length; i++) {
                    if(!vetor_rua.includes(vetor[i].Logradouro)) {
                        vetor_rua.push(vetor[i].Logradouro);
                    }
                        mensagem += `
                            <option value="${vetor[i].sensor_id}">${vetor[i].Logradouro}</option>
                        `;
                    lista_ids_ruas.push(vetor[i].id)
                }
                getDadosRuasCongestionadas(lista_ids_ruas)
                qtd_ruas.innerHTML = vetor.length
                let selectBairro = document.getElementById('slt_bairro') 
                let options = selectBairro.options;
                let opcaoSelecionada = options[options.selectedIndex].text;
                let textoBairro = opcaoSelecionada.split('-')[0]
                bairro_kpi.innerHTML = textoBairro
                spn_porcentagem.innerHTML = textoBairro
                // spn_porcentagem.innerHTML = nomeBairroVar;

                console.log(textoBairro)
                slt_ruas.innerHTML = mensagem;
                trocarGrafico(vetor[0].sensor_id);

            });

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}




