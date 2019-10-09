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
    tanggalTidakBerlaku: {
        type: Date
    },
    namaPemilikKendaraan: {
        type: String
    },
    alamatPerusahaan: {
        type: String
    },
    jarakSumbu: {
        type: String
    },
    panjangTotal: {
        type: String
    },
    lebarTotal: {
        type: String
    },
    tinggiTotal: {
        type: String
    },
    jenisKaroseri: {
        type: String
    },
    bahanKaroseri: {
        type: String
    },
    jumlahTempatDuduk: {
        type: String
    },
    jumlahTempatBerdiri: {
        type: String
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
        type: String
    },
    dayaBarang: {
        type: String
    },
    jb: {
        type: String
    },
    mst: {
        type: String
    },
    // bans: [{
    //     ban: String
    // }],
    bans: {
        type: JSON
    },
    roh: {
        type: String
    },
    foh: {
        type: String
    },
    pBak: {
        type: String
    },
    lBak: {
        type: String
    },
    tBak: {
        type: String
    },
    vSil: {
        type: String
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

module.exports = mongoose.model('kendaraan', KendaraanScehma)