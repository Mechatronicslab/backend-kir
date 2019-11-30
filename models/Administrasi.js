const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    jenisPengujian: {
        type: String,
        indexes: {
            unique: true
        }        
    },
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