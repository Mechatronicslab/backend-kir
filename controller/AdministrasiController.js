const model = require('../models/Administrasi')
const { requestResponse } = require('../setup')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
exports.createAdministrasi = async (data) =>
    await new Promise(async (resolve, reject) => {
        newData = new model(JSON.parse(JSON.stringify(data)))
        await newData.save()
            .then(res => resolve(requestResponse.common_success))
            .catch(err => reject(requestResponse.common_error))
    })


exports.updateAdministrasi = async (id, data) =>
    await new Promise(async (resolve, reject) => {
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

exports.getAdministrasi = async () =>
    await new Promise(async (resolve, reject) => {
        await model.find()
            .then(res => resolve(res))
            .catch(err => reject(requestResponse.common_error))
    })
