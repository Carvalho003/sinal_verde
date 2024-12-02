const database = require('../database/config')

function inserirDados(sensor_id, distancia){
    const sql = `INSERT INTO dados_sensor (sensor_id, distancia) VALUES (${sensor_id},${distancia});
`
return database.executar(sql)
}

function graficoUltimaHora(sensor_id, minutagemMaior, minutagemMenor){
    const sql = `select avg(distancia) as media, DATE_FORMAT(date_sub(now(), interval ${minutagemMenor} minute) , '%H:%i') as horario from dados_sensor where sensor_id =${sensor_id} 
and (dtHora between date_sub(now(), interval ${minutagemMaior} minute) and date_sub(now(), interval ${minutagemMenor} minute));`
return database.executar(sql);
}


function graficoUltimaHoraBairro(in_ids, minutagemMaior, minutagemMenor){
    const sql = `select avg(distancia) as media, DATE_FORMAT(date_sub(now(), interval ${minutagemMenor} minute) , '%H:%i') as horario from dados_sensor where sensor_id IN (${in_ids}) 
and (dtHora between date_sub(now(), interval ${minutagemMaior} minute) and date_sub(now(), interval ${minutagemMenor} minute));`
return database.executar(sql);
}




function graficoHoras(sensor_id, horarioMaior,horarioMenor){
    const sql = `select avg(distancia) as media, DATE_FORMAT(date_sub(now(), interval ${horarioMenor} hour) , '%H:%i') as horario  from dados_sensor where sensor_id =${sensor_id} 
and (dtHora between date_sub(now(), interval ${horarioMaior} hour) and date_sub(now(), interval ${horarioMenor} hour));`
return database.executar(sql);
}

function graficoHorasBairro(in_ids, horarioMaior,horarioMenor){
    const sql = `select avg(distancia) as media, DATE_FORMAT(date_sub(now(), interval ${horarioMenor} hour) , '%H:%i') as horario  from dados_sensor where sensor_id IN (${in_ids}) 
and (dtHora between date_sub(now(), interval ${horarioMaior} hour) and date_sub(now(), interval ${horarioMenor} hour));`
return database.executar(sql);
}




module.exports ={
    inserirDados,
    graficoUltimaHora,
    graficoHoras,
    graficoHorasBairro,
    graficoUltimaHoraBairro,
    
}