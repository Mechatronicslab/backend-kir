var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var cors = require('cors')
app.use(cors())
var mongoose = require('mongoose')
var port = process.env.PORT || 5100
var dbconfig = require('./config/DbConfig')

mongoose.connect(dbconfig.mongoURL,{
    useNewUrlParser:true
}).then(() => console.log('connect mongodb'))
.catch(err => console.log(err));

app.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    extended:true,
    limit: '50mb'
}));

// include routes
var Kendaraan = require("./routes/Kendaraan")
app.use("/kendaraan",Kendaraan)

var User = require("./routes/User")
app.use("/user",User)

app.listen(port,function(){
    console.log("Server started on port "+ port)
});