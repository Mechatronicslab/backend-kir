'use strict';
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan');
const router = express.Router({ mergeParams: true });
const port = process.env.PORT || 5100;
const http = require('http');
const fs = require('fs')
const cors = require('cors');
const path =require('path')
// let privateKey  = fs.readFileSync('D:\\pptikCSR\\Certificate Rumah Web\\key.pem', 'utf8')
// let certificate = fs.readFileSync('D:\\pptikCSR\\Certificate Rumah Web\\cert.pem', 'utf8')
// let credentials = { key: privateKey, cert: certificate }
// const server = http.createServer(credentials, app)
const server = http.createServer(app)
const setUp = require('./setup')
require('./routes/Kendaraan')(router)
require('./routes/User')(router)
require('./routes/administrasi')(router)
require('./routes/Transaksi')(router)
// app.use("/static/",express(path.join(__dirname,"static")))
// app.use(express.static('static'))
const directory = path.join(__dirname, '/static')
app.use('/static', express.static(directory));
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
        let addr = server.address();
        let bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        setUp.dbConnect().catch(err => {
            console.log('mongo error :' + err)
        })
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