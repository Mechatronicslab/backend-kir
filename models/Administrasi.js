const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    administrasi: Number,
    jasaUji:
        [{
            jenisKendaraan: String,
            harga: Number
        }],
    buktiLulusUji: {
        bukuKir: Number,
        stiker: Number,
        tandaUji: Number,
        pengetokanNoUji: Number,
        pengecetanTandaSamping: Number,
    },
    timeStamp: {
        default: new Date().toLocaleDateString(),
        type: Date
    }
})

module.exports = mongoose.model('administrasi', Schema)