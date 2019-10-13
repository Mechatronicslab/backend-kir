'use strict';
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan');
const router = express.Router({ mergeParams: true });
const port = process.env.PORT || 5100;
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const setUp = require('./setup');
require('./routes/Kendaraan')(router);
require('./routes/User')(router);
require('./routes/administrasi')(router);
require('./routes/Transaksi')(router);
app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({
    enableTypes: ['json', 'form'], extended: true
}))

app.use(bodyParser.json({
    extended: true
}))
app.use(logger('dev'))
app.use('/', router)
server.listen(port)
server.on('listening', onListening)
async function onListening() {
    try {
        console.log('try to listen...')
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        setUp.dbConnect()
        //app.database = database
        console.log('Listening on ' + bind)
        //debug('Listening on ' + bind);
    } catch (error) {
        console.log(error)
        console.log('listen failed, try to reconnect in 5 secs...')
        setTimeout(function () {
            onListening()
        }, 5000);
    }
}