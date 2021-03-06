const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    jenisPengujian: {
        type: String,
        indexes: {
            unique: true
        }        
    },
    administrasi: Number,
    jasaUji:Number,
    pengujianKendaraanMotor : Number,
    bukuUji : Number ,
    pengetokanNomorUji : Number ,
    stiker : Number ,
    biayaTandaUjiBaut : Number , 
    buktiLulusUji: Number,
    timeStamp: {
        default: new Date().toLocaleDateString(),
        type: Date
    }
})

module.exports = mongoose.model('administrasi', Schema)
