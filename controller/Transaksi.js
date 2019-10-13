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





