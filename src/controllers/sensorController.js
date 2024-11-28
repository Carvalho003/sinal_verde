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

    module.exports ={
        inserirDados
    }