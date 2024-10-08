function calcular() {
    var incidentes_mensais = Number(ipt_incidentes_mensais.value);
    var valor_gasto_incidente = Number(ipt_valor_gasto_incidente.value);
    var calculo_prejuizo = incidentes_mensais * valor_gasto_incidente;
    var calculo_valor_prevencao = calculo_prejuizo * 0.4;
    var nao_validou = 0;

    if (incidentes_mensais <= 0) {
      nao_validou = 1;
    }

    if (valor_gasto_incidente <= 0) {
      nao_validou += 1;
    }

    if (nao_validou > 0) {
      alert(`ERRO: Insira valores nas entradas para continuar`);
    } else {
      div_mensagem.innerHTML = `
            <h2>Resultado:</h2>
            <p>Você tem um <b>gasto total</b> de <b style='color:red;'>R$${calculo_prejuizo}</b> por mês.</p>
            <p>Com a nossa solução, você irá previnir até <b style='color: limegreen;'>40%</b>, ou seja,</p>
            <p>você irá economizar até <b style='color:limegreen;'>R$${calculo_valor_prevencao}</b> mensalmente.</p>
            `;
    }
  }