const database = require('../database/config')

function inserirDados(sensor_id, distancia){
    const sql = `INSERT INTO dados_sensor (sensor_id, distancia) VALUES (${sensor_id},${distancia});
`
return database.executar(sql)
}

module.exports ={
    inserirDados
}