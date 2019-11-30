const model = require('../models/Transaksi')
const Kendaraan = require('../models/Kendaraan')
const { requestResponse, generateIdTransaksi } = require('../setup')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
exports.createTransaksi = async (body) =>
    await new Promise(async (resolve, reject) => {
       
    //resolve(data)
    // let detail = JSON.parse(JSON.stringify(result))
    let newData = new model(JSON.parse(JSON.stringify(body)))
    let idTransaksi = {
        idTransaksi: generateIdTransaksi
    }
    Object.assign(newData, idTransaksi)
    Object.assign(body.tanggalTidakBerlaku, idTransaksi)
    Object.assign(body.date, idTransaksi)
    console.log(body.date)
    await newData.save()
        .then(() => {
            // if (body.jenisPengujian === 'Numpang Uji') {
            //     resolve(requestResponse.common_success)
            // } else {
            Kendaraan.updateOne({
                nomorUji: body.noUji
            },
            {
                "$set": {
                    tampakDepan: body.tampakDepan,
                    tampakBelakang: body.tampakBelakang,
                    tampakKanan: body.tampakKanan,
                    tampakKiri: body.tampakKiri,
                },
                "$addToSet": {
                    tanggalTidakBerlaku: body.tanggalTidakBerlaku,
                    // date: {
                    //     date: body.date.date
                    // }
                    date: body.date
                },
            }).then(() => {
                resolve(requestResponse.common_success)
            })
            .catch(() => {
                reject(requestResponse.common_error)
            })
        })
    })


exports.updateTransaksi = async (id, data) =>
    await new Promise(async (resolve, reject) => {
        await model.updateOne({
            _id: ObjectId(id)
        }, data)
            .then(res => resolve(requestResponse.common_success))
            .catch(err => reject(requestResponse.common_error))
    })

exports.deleteTransaksi = async (id) =>
    await new Promise(async (resolve, reject) => {
        await model.deleteOne({
            _id: ObjectId(id)
        })
            .then(res => resolve(requestResponse.common_success))
            .catch(err => reject(requestResponse.common_error))
    })

exports.verfNumpangUji = async (noUji) =>
    await new Promise(async (resolve, reject) => {
        await model.find({
            $and: [
                {
                    noUji: noUji
                },
                {
                    "$expr": { "$eq": [{ "$year": "$timeStamp" }, new Date().getFullYear()] }
                }
            ]
        })
            .then(res => {
                if (res.length > 0) {
                    resolve({
                        error: true,
                        message: 'Anda Sudah 1x Melakukan Pengujian Tahun Ini.'
                    })
                } else {
                    resolve({
                        error: false,
                        message: 'Silahkan Melakukan Pengujian.'
                    })
                }
            })
            .catch(err => reject(requestResponse.common_error))
            // .catch(err => console.log(err))
    })

exports.getAll = async() => 
    new Promise((resolve, reject) => {
        model.aggregate([
            {
                $lookup: {
                    from: "e__kendaraans",
                    localField: "noUji",
                    foreignField: "nomorUji",
                    as: "dataKendaraan"
                },
            },
            {
                $unwind: '$dataKendaraan'
            }
        ])
        .then(res => {
            resolve(res)
        }).catch((err) => {
            console.log(err)
            reject(requestResponse.common_error)
        })
    })

exports.getByDate = async (data) =>
    new Promise((resolve, reject) => {
        model.aggregate([
            {
                $match: {
                    timeStamp: {
                        "$gte": new Date(data.startDate),
                        "$lt": new Date(data.endDate)
                    }
                }
            },
            {
                $lookup: {
                    from: "e__kendaraans",
                    localField: "noUji",
                    foreignField: "nomorUji",
                    as: "dataKendaraan"
                },
            },
            {
                $unwind: '$dataKendaraan'
            }
        ]).then(res => {
            resolve(res)
        }).catch((err) => {
            resolve(requestResponse.common_error)
        })
    })

