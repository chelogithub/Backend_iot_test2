const dispositivo = require("./models/dispositivos");
const logs = require("./models/logs");
var pool = require('../../mysql');    
const clientMqtt = require("../../storage/mqtt");
const options = clientMqtt.MQTTOptions;
var arrayTopicsListen = ["/#"];             //escucha todo
var arrayTopicsServer = ["/test_node/"];    //escucha y publica

clientMqtt.on("connect", async function () {

    clientMqtt.subscribe(arrayTopicsListen, options, () => {
        console.log("Subscribed to topics: ");
        console.log(arrayTopicsListen);
    });
    //console.log(arrayTopicsServer);
    for (var elemento in arrayTopicsServer) {
        //console.log("MQTT: " + elemento);
        const mensaje = {
            dispositivoId: elemento,
            nombre: "ESP32_TEMP_NODEjs",
            ubicacion: "Terraza",
            logId: 1,
            ts: new Date().getTime(),
            luz1: 0,
            luz2: 0,
            temperatura: 16,
            humedad: 80,
            nodoId: 0,
        };
        const payload = JSON.stringify(mensaje);
        // Publico mensajes al inicio del servicio para verificar la subscripción
        clientMqtt.publish(arrayTopicsServer[elemento], payload, options, (error) => {
            if (error) {
                console.log(error);
            }
        })
    }
    clientMqtt.on("message", async (topic, payload) => {
        //console.log("[MQTT] Mensaje recibido: " + topic + ": " + payload.toString());
        var mensaje = payload.toString();
        if((mensaje[0]=='{')&&(mensaje[1]=='"'))
        {
            console.log("[MQTT] Mensaje recibido JSON: " + topic + ": " + payload.toString());
            const jason = JSON.parse(mensaje);
    
            console.log("dispositivoId: " + jason.dispositivoId);
            console.log("canal1: " + jason.canal1);
            console.log("canal2: " + jason.canal2);
            console.log("temperatura: " + jason.temperatura);
            console.log("humedad: " + jason.humedad);
            console.log("presion: " + jason.presion);
            console.log("nodoId: " + jason.nodoId);
            console.log("no se : " + jason.router);

            pool.query('SELECT * FROM Dispositivos WHERE  dispositivoID=? ', [jason.dispositivoId], function(err, result, fields) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("El resultado es:  " + JSON.stringify(result));//res.send(result);
                if (result=="")
                {
                    console.log("[MYSQL] Dispositivo no registrado, se agrega para verificar aprovisionamiento")
                }
                else
                    {
                        pool.query('INSERT INTO logNodos (dispositivoId, canal1, canal2, temperatura, humedad, presion, topico) values (?,?,?,?,?,?,?)', [jason.dispositivoId, jason.canal1, jason.canal2, jason.temperatura, jason.humedad, jason.presion, topic], function(err, result, fields) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            console.log(result);//res.send(result);
                        });
                    }
            });
            

   
        }else{

            console.log("[MQTT] Mensaje recibido NO-JSON: " + topic + ": " + payload.toString());
        }
     });
})

const register = (router) => {

    return router;
};  

module.exports = {
    register,
};
