var titulo = document.getElementById("titulo_span");
var texto = document.getElementById("texto_span");
var botao = document.getElementById("botao_contexto");
var card = document.getElementById("card_justificativa");
var card1 = document.querySelector(".cardjustificativaum");
var card2 = document.querySelector(".cardjustificativadois");


function mudar_texto(){
    titulo.innerHTML = `<span>PRINCIPAIS<br> CONSEQUÊNCIAS</span>`;
    texto.innerHTML = `<span>Os congestionamentos nas grandes cidades causam um prejuízo de R$ 111 bilhões anuais, o prejuízo causado pelos congestionamentos é reflexo do tempo perdido pelos trabalhadores nas grandes cidades, que passam, em média, 114 minutos diários no trajeto casa-trabalho-casa. Esse tempo despendido não só reduz a produtividade das empresas e o rendimento individual, mas também aumenta os custos operacionais e a pressão sobre os serviços públicos.</span>`
    card1.style.display = "none";
    card2.style.display = "none";
    card.style.backgroundImage = "url('../img/logos/pessoas\ no\ trânsito.png')";
    card.style.backgroundSize = "cover";
    card.style.backgroundRepeat = "no-repeat";

    botao.onclick = voltar;
    botao.innerText = `Voltar`
}

function voltar(){
    titulo.innerHTML = `<span>DESAFIOS<br> URBANOS</span>`;
    texto.innerHTML = `<span>As grandes cidades enfrentam <strong>congestionamentos severos,</strong> afetando a saúde, o bem-estar e a sustentabilidade. Essa situação impacta diretamente a eficiência das organizações de trânsito. Nossa missão é implementar soluções tecnológicas inovadoras, como semáforos inteligentes, para otimizar a mobilidade urbana e reduzir os impactos negativos do tráfego.`
    card1.style.display = "block";
    card2.style.display = "block";
    card1.style.display = "flex";
    card1.style.justifyContent = "center"
    card1.style.flexDirection = "column"
    card2.style.display = "flex";
    card2.style.justifyContent = "center"
    card2.style.flexDirection = "column"
    card.style.backgroundImage = "";
    card.style.backgroundSize = "";
    botao.onclick = mudar_texto;
    botao.innerText = `Entenda`

}