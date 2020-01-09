const Kendaraan = require('../models/Kendaraan')
const administrasi = require('../models/Administrasi')
const transaksi = require('../models/Transaksi')
const { requestResponse, generateIdTransaksi } = require('../setup')
const ObjectId = require('mongoose').Types.ObjectId
exports.postKendaraan = async (data) =>
    new Promise((resolve, reject) => {
        console.log(data.transaksi)
        try {
            let idTransaksi = {
                idTransaksi: data.hanyaKendaraan ? null : generateIdTransaksi
            }
            Object.assign(data.kendaraan.tanggalTidakBerlaku, idTransaksi)
            Object.assign(data.kendaraan.date, idTransaksi)
            Object.assign(data.transaksi, idTransaksi)
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
            }).catch((err) => {
                console.log(err)
                reject({
                    error: true,
                    msg: 'Nomor Uji Sudah Digunakan'
                })
            })
        } catch (error) {
            console.log(error)
            reject(requestResponse.common_error)
        }
    })

exports.numpangUji = (data) =>
    new Promise((resolve, reject) => {
        let idTransaksi = {
            idTransaksi: generateIdTransaksi
        }
        Object.assign(data.kendaraan.tanggalTidakBerlaku, idTransaksi)
        Object.assign(data.kendaraan.date, idTransaksi)
        Object.assign(data.transaksi, idTransaksi)
        transaksi.create(data.transaksi)
            .then(() => {
                Kendaraan.findOne({
                    nomorUji: data.kendaraan.nomorUji
                }).then(res => {
                    if (res === null) {
                        Kendaraan.create(data.kendaraan)
                            .then(() => {
                                resolve(requestResponse.common_success)
                            })
                    } else {
                        const kendaraan = data.kendaraan
                        const tanggalTidakBerlaku = kendaraan.tanggalTidakBerlaku
                        const date = kendaraan.date
                        delete kendaraan.tanggalTidakBerlaku
                        delete kendaraan.date
                        Kendaraan.updateOne({
                            nomorUji: kendaraan.nomorUji
                        },
                        {
                            "$set": kendaraan,
                            "$addToSet": {
                                tanggalTidakBerlaku: tanggalTidakBerlaku,
                                date: date
                            }
                        }).then(() => {
                            resolve(requestResponse.common_success)
                        })
                    }
                }).catch(() => {
                    reject(requestResponse.common_error)
                })
            })
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
                    await administrasi.findOne({
                        jenisPengujian: 'Uji Berkala'
                    })
                        .then(async (result) => {
                            let data = Object.assign({ kendaraan: kendaraan[0], administrasi: result })
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
        console.log(startDate + ' - ' + endDate)
        Kendaraan.find({
            timeStamp: {
                $gte: startDate
            },
            timeStamp: {
                $lte: endDate
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
        let tanggalTidakBerlaku = data.tanggalTidakBerlaku
        let date = data.date
        delete data.tanggalTidakBerlaku
        delete data.date
        Kendaraan.updateOne({
            _id: id,
            "tanggalTidakBerlaku._id": ObjectId(tanggalTidakBerlaku._id),
            "date._id": ObjectId(date._id)
        },
        {
            $set: {
                data,
                "tanggalTidakBerlaku.$.date": tanggalTidakBerlaku.date,
                "date.$.date": date.date
            }
        })
        .then(result => {
            console.log(result)
            resolve(result)
        }).catch(err => {
            console.log(err)
        })
    })

exports.mutasi = (data, id) =>
    new Promise((resolve, reject) => {
        Kendaraan.updateOne({
            _id: id
        }, data).then(() => {
            resolve({
                error: false,
                message: 'Berhasil Mutasi Kendaraan'
            })
        }).catch(() => {
            resolve({
                error: false,
                message: 'Gagal Mutasi Kendaraan'
            })
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
            // {
            //     "$unwind": "$tanggalTidakBerlaku"
            // },
            // {
            //     "$sort": {
            //         "tanggalTidakBerlaku.date": -1
            //     }
            // }
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