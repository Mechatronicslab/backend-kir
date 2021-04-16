const model = require('../models/Administrasi')
const { requestResponse } = require('../setup')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const kendaraan = require('../models/Kendaraan')
exports.createAdministrasi = async (data) =>
    await new Promise(async (resolve, reject) => {
        let newData = new model(JSON.parse(JSON.stringify(data)))
        await newData.save()
            .then(res => resolve(requestResponse.common_success))
            .catch(err => {
                if(err.code === 11000) {
                    reject(requestResponse.duplicatePrimary)
                } else {
                    reject(requestResponse.common_error)
                }
            })
    })


exports.updateAdministrasi = async (id, data) =>
    await new Promise(async (resolve, reject) => {
        console.log(id)
        await model.updateOne({
            _id: ObjectId(id)
        }, data)
            .then(res => resolve(requestResponse.common_success))
            .catch(err => reject(requestResponse.common_error))
    })

exports.deleteAdministrasi = async (id) =>
    await new Promise(async (resolve, reject) => {
        await model.deleteOne({
            _id: ObjectId(id)
        })
            .then(res => resolve(requestResponse.common_success))
            .catch(err => reject(requestResponse.common_error))
    })

exports.getAdministrasi = async (jenisPengujian) =>
    await new Promise(async (resolve, reject) => {
        if (jenisPengujian === '' || jenisPengujian === null) {
            reject(requestResponse.common_error)
        }
        await model.findOne({
            jenisPengujian: jenisPengujian
        })
            .then(res => resolve(res))
            .catch(() => reject(requestResponse.common_error))
    })


exports.getAdministrasiById = async (_id) =>
    await new Promise(async (resolve, reject) => {
        if (_id === '' || _id === null) {
            reject(requestResponse.common_error)
        }
        await model.findOne({
            _id: ObjectId(_id)
        })
            .then(res => resolve(res))
            .catch(() => reject(requestResponse.common_error))
    })