var pool = require('../../mysql');  
const register = (router) => {
    router.get('/last/:id', (req, res) => {
        pool.query("SELECT * FROM `logNodos` WHERE `dispositivoId`= ? ORDER BY `timestamp` DESC LIMIT 1", [req.params.id], function(err, result, fields) {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send(result[0]); //Se envía todo el vector.
            console.log(result);
        });
    });
  
    router.get('/dia/:id',  (req, res) =>  {
        pool.query("SELECT `timestamp`, `temperatura`, `presion`,`humedad`, `canal1`, `canal2` FROM `logNodos` WHERE `timestamp`BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() AND `dispositivoId`= ?  ORDER BY `timestamp` ASC ",[req.params.id], function(err, result, fields) {
              if (err) {
                res.send(err).status(400);
                console.log(err);
                return;
            }
            res.send(result); //Envío solo el primer elemento que vuelve de la BD
            
        });
    });
    
    //Espera recibir por parámetro un id de dispositivo y devuelve todas sus mediciones
    router.get('/semana/:id',  (req, res) =>  {
        pool.query("SELECT `timestamp`, `temperatura`, `presion`,`humedad`, `canal1`, `canal2` FROM `logNodos` WHERE `timestamp` BETWEEN DATE_SUB(NOW(), INTERVAL 168 HOUR) AND NOW() AND `dispositivoId`= ? ORDER BY `timestamp` ASC ",[req.params.id], function(err, result, fields) {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send(result); //Se envía todo el vector.
        });
    });
    
    //Espera recibir por parámetro un id de dispositivo y devuelve todas sus mediciones
    router.get('/todos/:id', (req, res) =>  {
        pool.query("SELECT `timestamp`, `temperatura`, `presion`,`humedad`, `canal1`, `canal2` FROM `logNodos` WHERE `dispositivoId`= ? ORDER BY `timestamp` ASC ",[req.params.id],function(err, result, fields) {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send(result); //Se envía todo el vector.
        });
    });

    //Espera recibir por parámetro un id de dispositivo y devuelve todas sus mediciones
    router.post('/intervalo/:id', (req, res) =>  {
        pool.query("SELECT `timestamp`, `temperatura`, `presion`,`humedad`, `canal1`, `canal2` FROM `logNodos` WHERE `dispositivoId`= ? AND `timestamp` BETWEEN ? AND ? ORDER BY `timestamp` ASC ",[req.params.id,req.body.inicio,req.body.fin],function(err, result, fields) {
            if (err) {
                console.log(req.body);
                res.send(err).status(400);
                return;
            }
            console.log(req.body);
            res.send(result); //Se envía todo el vector.
        });
    });

    return router;
};
  
  module.exports = {
    register,
  };


//   pool.query("SELECT `timestamp`, `temperatura`, `presion`,`humedad`, `canal1`, `canal2` FROM `logNodos` WHERE `dispositivoId`= ? AND `timestamp` BETWEEN ? AND ? ORDER BY `timestamp` ASC ",[req.params.id],[req.body.inicio],[req.body.fin],function(err, result, fields) {
           