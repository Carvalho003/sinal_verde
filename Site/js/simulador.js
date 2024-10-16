// function calcular() {
//     var incidentes_mensais = Number(ipt_incidentes_mensais.value);
//     var valor_gasto_incidente = Number(ipt_valor_gasto_incidente.value);
//     var calculo_prejuizo = incidentes_mensais * valor_gasto_incidente;
//     var calculo_valor_prevencao = calculo_prejuizo * 0.4;
//     var nao_validou = 0;

//     if (incidentes_mensais <= 0) {
//       nao_validou = 1;
//     }

//     if (valor_gasto_incidente <= 0) {
//       nao_validou += 1;
//     }

//     if (nao_validou > 0) {
//       alert(`ERRO: Insira valores nas entradas para continuar`);
//     } else {
//       div_mensagem.innerHTML = `
//             <h2>Resultado:</h2>
//             <p>Você tem um <b>gasto total</b> de <b style='color:red;'>R$${calculo_prejuizo}</b> por mês.</p>
//             <p>Com a nossa solução, você irá previnir até <b style='color: limegreen;'>40%</b>, ou seja,</p>
//             <p>você irá economizar até <b style='color:limegreen;'>R$${calculo_valor_prevencao}</b> mensalmente.</p>
//       `;
//     }
//   }

function simular(){
    let tempo_ocioso = Number(ipt_tempo_ocioso.value);
    let dias_semana = Number(ipt_dias_semana.value);

    let tempo_semana = tempo_ocioso * dias_semana;
    let tempo_economizado_semana = tempo_semana - (tempo_semana * 0.25)

    //media de liberação em gramas, 150(MEDIA), vamos reduzir em 15%

    let emissao_gas_economizado_semana = (tempo_economizado_semana * 60) * (150 * 0.15)

    let campoTempoGasto = document.getElementsByClassName('h1_tempo_gasto')[0]
    campoTempoGasto.innerText = tempo_semana + 'H';

    let emissao_gas_semana = (tempo_ocioso * 60) * 150

    span_emissao_semana.innerText = emissao_gas_semana + 'g';

    span_horas_economizadas.innerText = tempo_economizado_semana + "H";

    span_novo_gas.innerText = emissao_gas_economizado_semana + 'g';

    div_resultado.style.animation = 'showResult 1s linear';
    div_tempo_gasto.style.animation = 'showResult 1s linear';
    div_tempo_gasto.style.visibility = 'initial'
    div_resultado.style.visibility = 'initial';

    setTimeout(() => {
        div_resultado.style.animation = 'none';
        div_tempo_gasto.style.animation = 'none';
    },1000)
}