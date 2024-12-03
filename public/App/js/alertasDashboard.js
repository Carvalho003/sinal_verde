let alertas;


const getAlertas = () => {
    fetch(`http://127.0.0.1:3333/logradouro/${sessionStorage.EMPRESA_ID}/ruas`).then(res => res.json()).then(res => {
        if(alertas){
            if(JSON.stringify(res) !== JSON.stringify(alertas)){
                let copyRes = JSON.stringify(res);
                alerta_atual.style.animation = 'pulsar 1s linear infinite';
                for(let i = 0; i < res.length; i++){
                    if(alertas[i].ruaLivre != res[i].ruaLivre){
                        res[i]['mudou'] = true        
                    }
                }
                alertas = JSON.parse(copyRes);
                console.log(res)
                console.log(copyRes)

                fillModalAlertas(res)

            }else{
                console.log('tem que cair aqui')
            }
        }else{
            alertas = res
        
            res.map(registro => {
                let idNoSelect = document.getElementById('slt_ruas').value 
                console.log(idNoSelect)
                console.log(registro.sensorId)
                if(registro.sensorId == idNoSelect){
                    fillAlerta(registro)
                }
            })
            fillModalAlertas(res)
        }
    })
}

const fillModalAlertas = (infos) => {
    let html = ``;

    infos.map(info => {
        let situacao = 'parado'
        let color = "#A41D1D"
        if(info.ruaLivre){
            situacao = 'livre'
            color = '#1DA426'
        }
        let animation = ""
        if(info.mudou){
            animation = 'animation: pulsar 1s linear infinite'
        }
        let infosParaOutraFuncao = `${info.id}, ${info.bairro}, ${info.logradouro}, ${color}, ${situacao}`
        html += `<div onclick="pesquisar('${info.id}', '${info.bairro}', '${infosParaOutraFuncao}', this)" class="alerta-modal" style="display: flex;border-color:${color};${animation}">
                <span style="color: ${color}" id="div_alerta">${info.logradouro} com <br>trânsito ${situacao} a 15 minutos</span>
                <i style="color: ${color};" class='bx bxs-bell-ring'></i>   
                <!-- <i class='bx bx-chevron-down'></i> -->
            </div>`
    })

    div_alertas.innerHTML = html
}

const fillAlerta = (info) => {
    let situacao = 'parado'
    let color = "#A41D1D"
    if(info.ruaLivre){
        situacao = 'livre'
        color = '#1DA426'
    }
    alerta_atual.style.borderColor = color
    console.log(info)
    alerta_atual.innerHTML = `<span style="color: ${color}" id="div_alerta">${info.logradouro} com <br>trânsito ${situacao} a 15 minutos</span>
                <i style="color: ${color};" class='bx bxs-bell-ring'></i>   
                <i style="color: ${color}" onclick="abrirAlertas()" class='bx bx-chevron-down'></i>`
    alerta_atual.style.display = 'flex';
}

// 1DA426 -> verde

