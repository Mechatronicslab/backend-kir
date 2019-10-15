const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    noMesin: String,
    noUji: String,
    detail: JSON,
    jenisPengujian: String,
    tanggalTidakBerlaku: {
        type: Date
    },
    timeStamp: {
        default: new Date().toLocaleDateString(),
        type: Date
    }
})

module.exports = mongoose.model('transaksi', Schema)