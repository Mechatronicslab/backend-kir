const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KendaraanScehma = new Schema({
    noKendaraan: {
        type: String
    },
    merk: {
        type: String
    },
    type: {
        type: String
    },
    jenisPeruntukan: {
        type: String
    },
    tahunPembuatan: {
        type: String
    },
    tahunPenggunaan: {
        type: String
    },
    nomorRangka: {
        type: String
    },
    nomorMesin: {
        type: String
    },
    nomorUji: {
        type: String
    },
    tempatPengujian: {
        type: String
    },
    tanggalTidakBerlaku: [{
        type: Date
    }],
    namaPemilikKendaraan: {
        type: String
    },
    alamatPerusahaan: {
        type: String
    },
    jarakSumbu: {
        type: Number
    },
    panjangTotal: {
        type: Number
    },
    lebarTotal: {
        type: Number
    },
    tinggiTotal: {
        type: Number
    },
    jenisKaroseri: {
        type: String
    },
    bahanKaroseri: {
        type: String
    },
    jumlahTempatDuduk: {
        type: Number
    },
    jumlahTempatBerdiri: {
        type: Number
    },
    keterangan: {
        type: String
    },
    // jbbs: [{
    //     jbb: String
    // }],
    jbbs: {
        type: JSON
    },
    // bkks: [{
    //     bk: String
    // }],
    bkks: {
        type: JSON
    },
    dayaOrang: {
        type: Number
    },
    dayaBarang: {
        type: Number
    },
    jb: {
        type: Number
    },
    mst: {
        type: Number
    },
    // bans: [{
    //     ban: String
    // }],
    bans: {
        type: JSON
    },
    roh: {
        type: Number
    },
    foh: {
        type: Number
    },
    pBak: {
        type: Number
    },
    lBak: {
        type: Number
    },
    tBak: {
        type: Number
    },
    vSil: {
        type: Number
    },
    date: {
        type: Date
    },
    srut: {
        type: String
    },
    bahanBakar: {
        type: String
    },
    dayaAngkutOrang: {
        type: String
    },
    jenis: {
        type: String
    },
    umur: {
        type: String
    },
    timeStamp: {
        default: new Date().toLocaleDateString(),
        type: Date
    }
})

module.exports = mongoose.model('e_kendaraan', KendaraanScehma)