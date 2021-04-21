const util = require('util');
const mysql = require('mysql');
var nconf = require('nconf');

const pool = mysql.createPool({
    connectionLimit: 10,
//    host: '172.16.10.114',
    host: '207.180.221.147',
    port: 3306,
    user: 'sa',
    password: 'PTS@99remote',
    database: 'db_telegram',

    multipleStatements: true,
    acquireTimeout: 30000,
    connectTimeout: 20000,
    debug: false,
    waitForConnection: true,
    timeout: 60000
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }

    if (connection)
        connection.release();
    return;
});

// Promisify for Node.js async/await.
//pool.query = util.promisify(pool.query);

module.exports = pool;