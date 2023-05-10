var express = require('express');
var app = express();
var PORT = 3000;
var i=0;
var cors = require('cors');                                 //Agrego cors para permitir acceso desde otros dispositivos
//added
const errorHandler = require("errorhandler");
const Router = require("express-promise-router");       //Mejora la estructura de acceso a las rutas con middleware, mismo para login
const config = require("./config");
const helmet = require("helmet");                       //Securiza la aplicaciòn express, previniendo distintos ataques
const registerRoutes = require("./routes");
const router = Router();

var corsOptions={origin:'*', optionsSucessStatus:200};

var logger = function(req,res,next) {       //Middleware utilizado para la lectura tn podria ser cont logger=requiere("./logger")
  console.log("Se realizó consulta a la api, es la nro = " + i);
  i++;
  next();
}

app.use(logger);

app.use(express.json());

app.use(cors(corsOptions));
//added


app.use(helmet.xssFilter());                      //disables browsers' buggy cross-site scripting filter by setting the X-XSS-Protection header to 0
app.use(helmet.noSniff());                        //This mitigates MIME type sniffing which can cause security vulnerabilities
app.use(helmet.hidePoweredBy());                  //remueve el encabezado PoweredBy del encabezado HTTP
app.use(helmet.frameguard({ action: "deny" }));   //sets the X-Frame-Options header to help you mitigate clickjacking attacks.
app.use(router);
registerRoutes(router);
router.use((err, req, res, next) => {
  console.log("Error router" + err);
  res.status(500).send(err.message);
});
app.listen(PORT, function(req, res) {
    console.log("API Funcionando fuera de docker-compose");
});
