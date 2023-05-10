var mqtt = require('mqtt');
const fs = require('fs');                               //TLS
var caFile = fs.readFileSync('/home/marcelo/Marcelo/Git_places/DAIOT/MNMQTT/storage/certs/ca.crt');                //TLS
var KEY = fs.readFileSync('/home/marcelo/Marcelo/Git_places/DAIOT/MNMQTT/storage/certs/client.key');  //TLS
var CERT = fs.readFileSync('/home/marcelo/Marcelo/Git_places/DAIOT/MNMQTT/storage/certs/client.crt'); //TLS
const config = require("./../config");

const MQTT_ENV = config.services.MQTT;

var options = {
    clientId: 'mqttjs_01',//clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    rejectUnauthorized: false, //rejectUnauthorized: true,
    protocol: 'mqtts',
    key: KEY,
    cert: CERT,
    ca:caFile,
    qos: 2,
    port: MQTT_ENV.PORT,
    clean: true
}

const URI = `mqtts://${MQTT_ENV.HOST}`;
console.log("MQTT:" + URI);
const client = mqtt.connect(URI, options);
//const client = mqtt.connect("mqtts://192.168.0.186", options);

var arrayTopicsListen = [];
var arrayTopicsServer = [];
// connected
client.on('connect', function () {
    console.log("[MQTT] Init: Connected");
});
//handle errors
client.on("error", function (error) {
    console.log("[MQTT] Error: OCURRIÓ UN PROBLEMA: " + error);
});

client.MQTTOptions = options;
module.exports = client;