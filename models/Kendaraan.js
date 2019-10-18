const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KendaraanScehma = new Schema({
    noKendaraan: {
        type: String,
        default: ''
    },
    merk: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    jenisPeruntukan: {
        type: String
    },
    tahunPembuatan: {
        type: String,
        default: 0
    },
    tahunPenggunaan: {
        type: String,
        default: 0
    },
    nomorRangka: {
        type: String,
        default: ''
    },
    nomorMesin: {
        type: String,
        default: ''
    },
    nomorUji: {
        type: String,
        default: ''
    },
    tempatPengujian: {
        type: String,
        default: ''
    },
    tanggalTidakBerlaku: [{
        type: Date,
        default: new Date().toLocaleDateString()
    }],
    namaPemilikKendaraan: {
        type: String,
        default: ''
    },
    alamatPerusahaan: {
        type: String,
        default: ''
    },
    jarakSumbu: {
        type: Number,
        default: 0
    },
    panjangTotal: {
        type: Number,
        default: 0
    },
    lebarTotal: {
        type: Number,
        default: 0
    },
    tinggiTotal: {
        type: Number,
        default: 0
    },
    jenisKaroseri: {
        type: String,
        default: ''
    },
    bahanKaroseri: {
        type: String,
        default: ''
    },
    jumlahTempatDuduk: {
        type: Number,
        default: 0
    },
    jumlahTempatBerdiri: {
        type: Number,
        default: 0
    },
    keterangan: {
        type: String,
        default: ''
    },
    jbbs: {
        type: JSON,
        default: []
    },
    bkks: {
        type: JSON,
        default: []
    },
    dayaOrang: {
        type: Number,
        default: 0
    },
    dayaBarang: {
        type: Number,
        default: 0
    },
    jb: {
        type: Number,
        default: 0
    },
    mst: {
        type: Number,
        default: 0
    },
    bans: {
        type: JSON,
        default: []
    },
    roh: {
        type: Number,
        default: 0
    },
    foh: {
        type: Number,
        default: 0
    },
    pBak: {
        type: Number,
        default: 0
    },
    lBak: {
        type: Number,
        default: 0
    },
    tBak: {
        type: Number,
        default: 0
    },
    vSil: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: new Date().toLocaleDateString()
    },
    srut: {
        type: String,
        default: ''
    },
    bahanBakar: {
        type: String,
        default: ''
    },
    dayaAngkutOrang: {
        type: String,
        default: ''
    },
    jenis: {
        type: String,
        default: ''
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

module.exports = mongoose.model('e_kendaraan', KendaraanScehma)