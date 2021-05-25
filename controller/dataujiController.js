const datauji = require("../models/datauji");
const { requestResponse, knex } = require("../setup");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getDataUji = () => new Promise(async (resolve, reject) => {
    await datauji
        .find().sort({ _id: -1 })
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        });
});

exports.getDataUjiPaginate = (page, resPerPage, filter) =>
    new Promise(async (resolve, reject) => {
        if (filter === 'null') {
            await datauji
                .find({ nouji: { $regex: ".*" } })
                .skip(resPerPage * page - resPerPage)
                .limit(resPerPage)
                .sort({ _id: -1 })
                .exec((err, result) => {
                    if (err) {
                        return requestResponse.common_error
                    }else {
                        datauji
                            .aggregate([{ $group: { _id: null, totaldata: { $sum: 1 } } }])
                            .exec((count_error, count) => {
                                if(!count_error){
                                    resolve(requestResponse.commonSuccessDataPaginate(result , count[0].totaldata , page , resPerPage , filter))
                                   
                                }else {
                                    reject(requestResponse.common_error)
                                }
                            })
                    }
                })
        } else {
            await datauji
                .find(
                    {
                        nouji: { $regex: new RegExp("^" + filter.toLowerCase(), "i") }
                    },
                )
                .skip(resPerPage * page - resPerPage)
                .limit(resPerPage)
                .sort({ _id: -1 })
                .exec((err, result) => {
                    if (err) {
                        return requestResponse.common_error
                    }else {
                        datauji
                            .aggregate([{ $group: { _id: null, totaldata: { $sum: 1 } } }])
                            .exec((count_error, count) => {
                                if(!count_error){
                                    resolve(requestResponse.commonSuccessDataPaginate(result , count[0].totaldata , page , resPerPage , filter))
                                  
                                }else {
                                    reject(requestResponse.common_error)
                                }
                            })
                    }
                })
        }
    });

exports.getDataUjiByNoUji = (nouji) => new Promise(async (resolve, reject) => {
    await datauji
        .findOne({ nouji: nouji })
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        });
});

exports.create = (data) => new Promise(async (resolve, reject) => {
    console.log(data)
    await datauji
        .updateOne({ nouji: data.nouji }, data, { upsert: true })
        .then((result) => {
            resolve(requestResponse.common_success);
        })
        .catch((err) => {
            reject(err);
        });
});


