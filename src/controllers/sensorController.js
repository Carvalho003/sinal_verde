const model = require('../models/sensorModel');


function inserirDados(req, res){
    const sensor_id = req.body.sensor_id
    const distancia = Math.floor((Math.random() * 6 + 1))

    model.inserirDados(sensor_id, distancia).then(resposta =>{
        res.json(resposta)
    }).catch(e => {
        res.json(e)
    })
}

async function graficoUltimaHora(req, res){
    const sensor_id = req.params.sensorId;
    const dadosUltimaHora = {
        dados: [],
        horarios: []
    };
    const promises = [];
    let minutagemMaior =5;
    let minutagemMenor =0
    for(let i =0; i <12; i++){
        promises.push(
            await model.graficoUltimaHora(sensor_id, minutagemMaior, minutagemMenor).then(response => {
                return response[0]
            }).catch(e => {
                console.log(e)
            })
        );
        minutagemMaior += 5;
        minutagemMenor += 5;
    }

    await Promise.all(promises.map(resultado => {
        if(resultado){
            console.log(resultado)
         dadosUltimaHora.horarios.push(resultado.horario);
         if((resultado.media)){
            dadosUltimaHora.dados.push(Number((resultado.media).toFixed(2)))   
         }else {
            dadosUltimaHora.dados.push(0)   
         }
        }else {
            // dadosUltimaHora.push(0)
        }
    }))

    console.log(dadosUltimaHora);
    dadosUltimaHora.dados.reverse()
    dadosUltimaHora.horarios.reverse()
    res.json(dadosUltimaHora);
}



async function graficoUltimaHoraBairro(req, res){
    const in_ids = req.body.in_ids;
    const dadosUltimaHora = {
        dados: [],
        horarios: []
    };
    const promises = [];
    let minutagemMaior =5;
    let minutagemMenor =0
    for(let i =0; i <12; i++){
        promises.push(
            await model.graficoUltimaHoraBairro(in_ids, minutagemMaior, minutagemMenor).then(response => {
                return response[0]
            }).catch(e => {
                console.log(e)
            })
        );
        minutagemMaior += 5;
        minutagemMenor += 5;
    }

    await Promise.all(promises.map(resultado => {
        if(resultado){
            console.log(resultado)
         dadosUltimaHora.horarios.push(resultado.horario);
         if((resultado.media)){
            dadosUltimaHora.dados.push(Number((resultado.media).toFixed(2)))   
         }else {
            dadosUltimaHora.dados.push(0)   
         }
        }else {
            // dadosUltimaHora.push(0)
        }
    }))

    console.log(dadosUltimaHora);
    dadosUltimaHora.dados.reverse()
    dadosUltimaHora.horarios.reverse()
    res.json(dadosUltimaHora);
}

async function graficoSeisHoras(req, res){
    const sensor_id = req.params.sensorId;
    const dadosUltimaHora = {
        dados: [],
        horarios: []
    };
    const promises = [];
    let minutagemMaior =30;
    let minutagemMenor =0
    for(let i =0; i <12; i++){
        promises.push(
            await model.graficoUltimaHora(sensor_id, minutagemMaior, minutagemMenor).then(response => {
                return response[0]
            }).catch(e => {
                console.log(e)
            })
        );
        minutagemMaior += 30;
        minutagemMenor += 30;
    }

    await Promise.all(promises.map(resultado => {
        if(resultado){
            console.log(resultado)
         dadosUltimaHora.horarios.push(resultado.horario);
         if((resultado.media)){
            dadosUltimaHora.dados.push(Number((resultado.media).toFixed(2)))   
         }else {
            dadosUltimaHora.dados.push(0)   
         }
        }else {
            // dadosUltimaHora.push(0)
        }
    }))

    console.log(dadosUltimaHora);
    dadosUltimaHora.dados.reverse()
    dadosUltimaHora.horarios.reverse()
    res.json(dadosUltimaHora);
}



async function graficoSeisHorasBairro(req, res){
    const in_ids = req.body.in_ids;
    const dadosUltimaHora = {
        dados: [],
        horarios: []
    };
    const promises = [];
    let minutagemMaior =30;
    let minutagemMenor =0
    for(let i =0; i <12; i++){
        promises.push(
            await model.graficoUltimaHoraBairro(in_ids, minutagemMaior, minutagemMenor).then(response => {
                return response[0]
            }).catch(e => {
                console.log(e)
            })
        );
        minutagemMaior += 30;
        minutagemMenor += 30;
    }

    await Promise.all(promises.map(resultado => {
        if(resultado){
            console.log(resultado)
         dadosUltimaHora.horarios.push(resultado.horario);
         if((resultado.media)){
            dadosUltimaHora.dados.push(Number((resultado.media).toFixed(2)))   
         }else {
            dadosUltimaHora.dados.push(0)   
         }
        }else {
            // dadosUltimaHora.push(0)
        }
    }))

    console.log(dadosUltimaHora);
    dadosUltimaHora.dados.reverse()
    dadosUltimaHora.horarios.reverse()
    res.json(dadosUltimaHora);
}

async function graficoRuasDoBairroCongestionadas(req, res){
    const in_ids = req.body.in_ids;
    const id_ruas_verificar = in_ids.split(',');
    const dadosUltimaHora = {
        dados: []
    };
    const promises = [];
    for(let j = 0; j < id_ruas_verificar.length; j++){
        let minutagemMaior =5;
        let minutagemMenor =0;
        for(let i =0; i <3; i++){
            promises.push(
                await model.graficoUltimaHora(id_ruas_verificar[j], minutagemMaior, minutagemMenor).then(response => {
                    return response[0]
                }).catch(e => {
                    console.log(e)
                })
            );
            minutagemMaior += 5;
            minutagemMenor += 5;
        }
    }

    await Promise.all(promises.map(resultado => {
        if(resultado){
            console.log(resultado)
         
         if((resultado.media)){
            dadosUltimaHora.dados.push(Number((resultado.media).toFixed(2)))   
         }else {
            dadosUltimaHora.dados.push(0)   
         }
        }else {
            // dadosUltimaHora.push(0)
        }
    }))
    let ruasCongestionadas = 0;
    let ruasTotais = 0;
    let controlador =1;
    let contarCongestionadas = 0;
    let dados = dadosUltimaHora.dados
    for(let i =0; i < dados.length; i++){
        
        if(dados[i] <= 10){
            contarCongestionadas++; 
        }
        if(controlador % 3 == 0){
            if(contarCongestionadas == 3){
                ruasCongestionadas++;
            }
            contarCongestionadas =0;
            ruasTotais++
        }
        controlador++
    }
    let porcentagemCongestionadas = (ruasCongestionadas * 100) / ruasTotais;
    
    res.json({
        ruasCongestionadas: ruasCongestionadas,
        ruasLivres: ruasTotais - ruasCongestionadas,
        porcentagemCongestionadas: porcentagemCongestionadas
    })
}


async function graficoDozeHorasBairro(req, res){
    const in_ids = req.body.in_ids;
    const dadosUltimaHora = {
        dados: [],
        horarios: []
    };
    const promises = [];
    let horarioMaior =1;
    let horarioMenor =0
    for(let i =0; i <12; i++){
        promises.push(
            await model.graficoHorasBairro(in_ids, horarioMaior,horarioMenor).then(response => {
                return response[0]
            }).catch(e => {
                console.log(e)
            })
        );
        horarioMaior += 1;
        horarioMenor += 1;
    }

    await Promise.all(promises.map(resultado => {
        if(resultado){
            console.log(resultado)
         dadosUltimaHora.horarios.push(resultado.horario);
         if((resultado.media)){
            dadosUltimaHora.dados.push(Number((resultado.media).toFixed(2)))   
         }else {
            dadosUltimaHora.dados.push(0)   
         }        }else {
            // dadosUltimaHora.push(0)
        }
    }))

    console.log(dadosUltimaHora);
    dadosUltimaHora.dados.reverse()
    dadosUltimaHora.horarios.reverse()
    res.json(dadosUltimaHora);
}


async function graficoDozeHoras(req, res){
    const sensor_id = req.params.sensorId;
    const dadosUltimaHora = {
        dados: [],
        horarios: []
    };
    const promises = [];
    let horarioMaior =1;
    let horarioMenor =0
    for(let i =0; i <12; i++){
        promises.push(
            await model.graficoHoras(sensor_id, horarioMaior,horarioMenor).then(response => {
                return response[0]
            }).catch(e => {
                console.log(e)
            })
        );
        horarioMaior += 1;
        horarioMenor += 1;
    }

    await Promise.all(promises.map(resultado => {
        if(resultado){
            console.log(resultado)
         dadosUltimaHora.horarios.push(resultado.horario);
         if((resultado.media)){
            dadosUltimaHora.dados.push(Number((resultado.media).toFixed(2)))   
         }else {
            dadosUltimaHora.dados.push(0)   
         }        }else {
            // dadosUltimaHora.push(0)
        }
    }))

    console.log(dadosUltimaHora);
    dadosUltimaHora.dados.reverse()
    dadosUltimaHora.horarios.reverse()
    res.json(dadosUltimaHora);
}


module.exports ={
    inserirDados,
    graficoUltimaHora,
    graficoSeisHoras,
    graficoDozeHoras,
    graficoUltimaHoraBairro,
    graficoSeisHorasBairro,
    graficoDozeHorasBairro,
    graficoRuasDoBairroCongestionadas
}