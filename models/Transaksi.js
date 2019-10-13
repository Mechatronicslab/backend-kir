const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    noMesin: String,
    noUji: String,
    detail: JSON,
    timeStamp: {
        default: new Date().toLocaleDateString(),
        type: Date
    }
})

module.exports = mongoose.model('transaksi', Schema)