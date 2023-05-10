var pool = require('../../mysql');  
const register = (router) => {
    router.get('/dispositivo', (req, res) => {
        pool.query('SELECT * FROM Dispositivos', function(err, result, fields) {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send(result);
        });   
    })
  
    //listar leds de la db
    router.get('/dispositivo/:id/', (req, res) => {
        pool.query('SELECT * FROM Dispositivos WHERE dispositivoId=?', [req.params.id], function(err, result, fields) {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send(result[0]);
        });
    
    });
    return router;
  };
  
  module.exports = {
    register,
  };