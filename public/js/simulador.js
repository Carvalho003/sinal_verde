function simular(){
    let tempo_ocioso = Number(ipt_tempo_ocioso.value);
    let dias_semana = Number(ipt_dias_semana.value);

    if(dias_semana < 0 || dias_semana > 7){
        modal.showModal();
        return span_erro.innerText = "Preencha o campo de dias da semana em um intervalo de 1 a 7 dias";
    }

    let tempo_semana = tempo_ocioso * dias_semana;
    let tempo_economizado_semana = tempo_semana - (tempo_semana * 0.25)

    //media de liberação em gramas, 150(MEDIA), vamos reduzir em 15%

    let emissao_gas_economizado_semana = (tempo_economizado_semana * 60) * (150 * 0.15)

    let campoTempoGasto = document.getElementsByClassName('h1_tempo_gasto')[0]
    campoTempoGasto.innerText = tempo_semana + ' Horas';

    let emissao_gas_semana = (tempo_ocioso * 60) * 150

    span_emissao_semana.innerText = emissao_gas_semana/1000 + 'kg';

    span_horas_economizadas.innerText = tempo_semana - tempo_economizado_semana + " horas";

    span_novo_gas.innerText = (emissao_gas_semana - emissao_gas_economizado_semana)/1000 + 'kg';

    div_resultado.style.animation = 'showResult 1s linear';
    div_tempo_gasto.style.animation = 'showResult 1s linear';
    div_tempo_gasto.style.visibility = 'initial'
    div_resultado.style.visibility = 'initial';

    setTimeout(() => {
        div_resultado.style.animation = 'none';
        div_tempo_gasto.style.animation = 'none';
    },1000)
}





// parte nova 


// Qual o valor anual que é investido no combate ao congestionamento, em reais? gastoAnual

// Qual a quantidade média de tempo gasto no deslocamento casa-trabalho, em minutos? tempoMedioDeslocamento

// const valorDeixouProduzirMedioTempoDeslocamento = (111 000 000 000 * tempoMedioDeslocamento)/114;
// 			             10%
// var economiaAnual = gastoAnual * (10/100);

// var economiaTempoMedioDeslocamento = tempoMedioDeslocamento - (tempoMedioDeslocamento * (25/100)); 

// var valorProduziuMedio = valorDeixouProduzirMedioTempoDeslocamento - ((111 000 000 000 * tempoMedioDeslocamento)/114);

// var totalEconomia = economiaAnual + valorProduziuMedio;

// - Informar a economia do valor que seria investido: economiaAnual

// - Informar o valor que deixaria de ser produzido para a economia que se tem o tempo de deslocamento casa-trabalho: valorDeixouProduzirMedioTempoDeslocamento, tempoMedioDeslocamento

// - Informar valor que seria produzido por nossa solução e o novo tempo de deslocamento: valorProduziuMedio, economiaTempoMedioDeslocamento

// - Informar total da economia: totalEconomia