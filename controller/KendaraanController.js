const Kendaraan = require('../models/Kendaraan')
const administrasi = require('../models/Administrasi')
const transaksi = require('../models/Transaksi')
const { requestResponse } = require('../setup')
const ObjectId = require('mongoose').Types.ObjectId
exports.postKendaraan = async (data) =>
    new Promise((resolve, reject) => {
        try {
            Kendaraan.create(
                data.kendaraan
            ).then((hasil) => {
                if (data.hanyaKendaraan) {
                    resolve(hasil)
                } else {
                    transaksi.create(
                        data.transaksi
                    ).then((res) => {
                        resolve(res)
                    })
                }
            }).catch(() => {
                reject({
                    error: true,
                    msg: 'Nomor Uji Sudah Digunakan'
                })
            })
        } catch (error) {
            reject(error)
        }
    })

exports.updatePatch = (data, id) =>
    new Promise((resolve, reject) => {
        Kendaraan.updateOne({
            _id: ObjectId(id)
        },
        {
            "$set": {
                data,
                "$push": data.tanggalTidakBerlaku
            }
        }).then(() => resolve(requestResponse.common_success))
        .catch(() => reject(requestResponse.common_error))
    })


exports.getdata = () =>
    new Promise((resolve, reject) => {
        Kendaraan.find({
            deleted: false
        })
            .then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
    })


exports.getdataById = (body) =>
    new Promise(async (resolve, reject) => {
        await Kendaraan.find(body)
            .then(async (kendaraan) => {
                if (kendaraan.length > 0) {
                    await administrasi.find()
                        .then(async (result) => {
                            let data = Object.assign({ kendaraan: kendaraan[0], administrasi: result[0] })
                            resolve(data)
                        }).catch(err => {
                            reject(err)
                        })
                } else {
                    reject(requestResponse.data_not_found)
                }
            }).catch(err => {
                reject(err)
            })
    })

exports.getdataByDate = (start, end) =>
    new Promise((resolve, reject) => {
        let startDate = new Date(start)
        let endDate = new Date(end)
        Kendaraan.find({
            timeStamp: {
                $gte: startDate,
                $lt: endDate
            }
        })
            .then(result => {
                resolve(result)
            }).catch(err => {
                console.log(err)
            })
    })

exports.updatedata = (data, id) =>
    new Promise((resolve, reject) => {
        Kendaraan.updateOne({
            _id: id
        },
            {
                noKendaraan: data.noKendaraan,
                merk: data.merk,
                type: data.type,
                jenisPeruntukan: data.jenisPeruntukan,
                tahunPembuatan: data.tahunPembuatan,
                tahunPenggunaan: data.tahunPenggunaan,
                nomorRangka: data.nomorRangka,
                nomorMesin: data.nomorMesin,
                nomorUji: data.nomorUji,
                tempatPengujian: data.tempatPengujian,
                tanggalTidakBerlaku: data.tanggalTidakBerlaku,
                namaPemilikKendaraan: data.namaPemilikKendaraan,
                alamatPerusahaan: data.alamatPerusahaan,
                jarakSumbu: data.jarakSumbu,
                panjangTotal: data.panjangTotal,
                lebarTotal: data.lebarTotal,
                tinggiTotal: data.tinggiTotal,
                jenisKaroseri: data.jenisKaroseri,
                bahanKaroseri: data.bahanKaroseri,
                jumlahTtempatDuduk: data.jumlahTtempatDuduk,
                jumlahTtempatberdiri: data.jumlahTtempatberdiri,
                keterangan: data.keterangan,
                jbbs: data.jbbs,
                bkks: data.bkks,
                dayaOrang: data.dayaOrang,
                dayaBarang: data.dayaBarang,
                jb: data.jb,
                mst: data.mst,
                bans: data.bans,
                roh: data.roh,
                foh: data.foh,
                pBak: data.pBak,
                lBak: data.lBak,
                tBak: data.tBak,
                vSil: data.vSil,
                date: data.date,
                srut: data.srut,
                bahanBakar: data.bahanBakar,
                dayaAngkutOrang: data.dayaAngkutOrang,
                jenis: data.jenis,
                umur: data.umur
            })
            .then(result => {
                resolve(result)
            }).catch(err => {
                console.log(err)
            })
    })

    exports.updatedata = (data, id) =>
    new Promise((resolve, reject) => {
        let tanggalTidakBerlaku = data.tanggalTidakBerlaku
        delete data.tanggalTidakBerlaku
        console.log(tanggalTidakBerlaku)
        Kendaraan.updateOne({
            _id: id,
            "tanggalTidakBerlaku._id": ObjectId(tanggalTidakBerlaku._id),
        },
        {
            $set: {
                data,
                "tanggalTidakBerlaku.$.date": tanggalTidakBerlaku.date
            }
        })
        .then(result => {
            console.log(result)
            resolve(result)
        }).catch(err => {
            console.log(err)
        })
    })

exports.getdetail = (id) =>
    new Promise((resolve, reject) => {
        Kendaraan.aggregate([
            {
                "$match": {
                    _id: ObjectId(id)
                }
            },
            {
                "$unwind": "$tanggalTidakBerlaku"
            },
            {
                "$sort": {
                    "tanggalTidakBerlaku.date": -1
                }
            }
        ])
            .then(result => {
                resolve(result[0])
            }).catch(err => {
                console.log(err)
            })
    })

exports.delete = (id) =>
    new Promise((resolve, reject) => {
        Kendaraan.deleteOne({ _id: id })
            .then(result => {
                resolve(result)
            }).catch(err => {
                console.log(err)
            })
    })