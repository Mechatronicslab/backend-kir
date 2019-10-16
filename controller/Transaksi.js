const model = require('../models/Transaksi')
const administrasi = require('../models/Administrasi')
const { requestResponse } = require('../setup')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
exports.createTransaksi = async (body) =>
    await new Promise(async (resolve, reject) => {
       
    //resolve(data)
    // let detail = JSON.parse(JSON.stringify(result))
    newData = new model(JSON.parse(JSON.stringify(body)))
    await newData.save()
        .then(res => resolve(requestResponse.common_success))
        .catch(err => reject(requestResponse.common_error))
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
                    from: "e_kendaraans",
                    localField: "nomorUji",
                    foreignField: "noUji",
                    as: "dataKendaraan"
                },
            },
            {
                $unwind: '$dataKendaraan'
            }
        ]).then(res => {
            resolve(res)
        }).catch(() => {
            reject(requestResponse.common_error)
        })
    })




