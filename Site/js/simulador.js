function simular(){
    let gastoAnual = Number(iptGastoAnual.value);
    let tempoMedioDeslocamento = Number(iptQtdTempo.value);

    const valorDeixouProduzirMedioTempoDeslocamento = (111000000000 * tempoMedioDeslocamento)/114;

    var economiaAnual = gastoAnual - (gastoAnual * 0.9);
    console.log(economiaAnual);
    var economiaTempoMedioDeslocamento = tempoMedioDeslocamento - (tempoMedioDeslocamento * (25/100)); 
    let valorDeixouProduzirMedioEconomiaTempoDeslocamento = ((111000000000 * economiaTempoMedioDeslocamento)/114);
    var valorProduziuMedio = valorDeixouProduzirMedioTempoDeslocamento - valorDeixouProduzirMedioEconomiaTempoDeslocamento;
    var totalEconomia = economiaAnual + valorProduziuMedio;

    // - Informar o valor que deixaria de ser produzido para a economia que se tem o tempo de deslocamento casa-trabalho: valorDeixouProduzirMedioTempoDeslocamento, tempoMedioDeslocamento

    // - Informar valor que seria produzido por nossa solução e o novo tempo de deslocamento: valorProduziuMedio, economiaTempoMedioDeslocamento

    outputGasto.innerText = `${totalEconomia.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;

    span_tempo_deslocamento.innerText = tempoMedioDeslocamento;

    span_investimento_economizado.innerText = `${economiaAnual.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;

    span_novo_tempo_deslocamento.innerText = economiaTempoMedioDeslocamento;

    span_deixar_produzir_economia.innerText = `${valorDeixouProduzirMedioTempoDeslocamento.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;

    div_resultado.style.animation = 'showResult 1s linear';
    div_tempo_gasto.style.animation = 'showResult 1s linear';
    div_tempo_gasto.style.visibility = 'initial'
    div_resultado.style.visibility = 'initial';

    setTimeout(() => {
        div_resultado.style.animation = 'none';
        div_tempo_gasto.style.animation = 'none';
    },1000)
}
