const config = require("../config")
const glob = require("glob");
const registerRoutes = (router) => {
    const isWin = process.platform === "win32";
    const path = config.ENVIRONMENT === "dev" ? __dirname : config.ROUTER_PATH;
    const routes = glob.sync((isWin ? path.replace(/\\/g, '/') : path) + '/**/*.router');//const routes = glob.sync((isWin ? path.replace(/\\/g, '/') : path) + '/**/*.router');
    routes.map(route => register(route, router));
}   //registra todas las rutas en routers

const register = (routePath, router) => {
    const route = require(routePath);
    const routeName = routePath.split("/").pop().split(".")[0];
    console.log("Rutas registradas: ", routeName);
    router.use(`/${routeName}`, route.register(router));
}
//registra dinamicamente los endpoints, la carpeta que creo la toma como endpoint
module.exports = registerRoutes;
