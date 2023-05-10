var mysql = require('mysql'); //importa el package para manejar SQL
var configMysql = {
    connectionLimit: 10,      // Límite de conexiones a aceptar
    host: '172.18.0.2',//'172.28.0.3',//host: 'mysql-server' //Es el que figuira en la base -1
    port:  '3306',//port:  3306,
    user: 'root',
    password: 'userpass',
    database: 'roe_iot'// database: 'DAM'
}


var pool = mysql.createPool(configMysql);
pool.getConnection( (err, connection) => {
    if (err) {
        switch (err.code) {
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('La conexion a la DB se cerró.');
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('La base de datos tiene muchas conexiones');
                break;
            case 'ECONNREFUSED':
                console.error('La conexion fue rechazada');
        }
        if (connection) {
            connection.release();

        }
        return;
    }
});
module.exports = pool;        //comparto el routerMysql


