const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    noMesin: String,
    noUji: String,
    detail: JSON,
    jenisPengujian: String,
    tanggalTidakBerlaku: {
        type: Date
    },
    tampakDepan: {
        type: String,
        default: ''
    },
    tampakBelakang: {
        type: String,
        default: ''
    },
    tampakKanan: {
        type: String,
        default: ''
    },
    tampakKiri: {
        type: String,
        default: ''
    },
    timeStamp: {
        default: new Date().toLocaleDateString(),
        type: Date
    }
})

module.exports = mongoose.model('transaksi', Schema)