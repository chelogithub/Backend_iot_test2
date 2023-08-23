var pool = require('../../mysql'); 
const clientMqtt = require("../../storage/mqtt"); 
const options = clientMqtt.MQTTOptions;
const register = (router) => {
    router.post('/canal', (req, res) => { 

        const topico=req.body.topico;
        const data=req.body.data;

            clientMqtt.publish(topico,data,options, (error) => {
                if (error) {
                    console.log(error);
                    res.send("ERROR"); //Agregado para mandarle algo al front
                }else
                {
                    res.send("DONE"); //Agregado para mandarle algo al front
                }
            });
            
    });
  
    router.get('/canal2/:id',  (req, res) =>  {
        pool.query("SELECT `timestamp`, `temperatura`, `presion`,`humedad`, `canal1`, `canal2` FROM `logNodos` WHERE `timestamp`BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() AND `dispositivoId`= ?  ORDER BY `timestamp` ASC ",[req.params.id], function(err, result, fields) {
              if (err) {
                res.send(err).status(400);
                console.log(err);
                return;
            }
            res.send(result); //Envío solo el primer elemento que vuelve de la BD
            
        });
    });
    
   
    return router;
  };
  
  module.exports = {
    register,
  };
