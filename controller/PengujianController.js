const Kendaraan = require("../models/Kendaraan");
const Pengujian = require("../models/Pengujian");
const { requestResponse, knex } = require("../setup");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getPengujian = () => new Promise(async (resolve, reject) => {
    await Pengujian
        .aggregate([
            {
                $lookup: {
                    from: "kendaraans",
                    localField: "nouji",
                    foreignField: "nouji",
                    as: "kendaraan"
                }
            }
        ])
        .then(async (result) => {
            resolve(requestResponse.suksesWithData(result));
        })
        .catch((err) => {
            console.log(err);
            reject(requestResponse.common_error);
        });
});

exports.getPengujianPaginate = (page, resPerPage, filter) =>
    new Promise(async (resolve, reject) => {
        // console.log(filter)
        if (filter === 'null' || filter == undefined) {
            await Pengujian
                .aggregate([
                    { $match: { $or: [{ nouji: { $regex: ".*" } }, { statuspenerbitan: { $regex: ".*" } },] } },
                    {
                        $lookup: {
                            from: "kendaraans",
                            localField: "nouji",
                            foreignField: "nouji",
                            as: "kendaraan"
                        }
                    }
                ])
                .skip(resPerPage * page - resPerPage)
                .limit(resPerPage)
                .sort({ _id: -1 })
                .exec((err, result) => {
                    if (err) {
                        return requestResponse.common_error
                    } else {
                        Pengujian
                            .aggregate([{ $group: { _id: null, totaldata: { $sum: 1 } } }])
                            .exec((count_error, count) => {
                                if (!count_error) {
                                    resolve(requestResponse.commonSuccessDataPaginate(result, count[0].totaldata, page, resPerPage, filter))

                                } else {
                                    reject(requestResponse.common_error)
                                }
                            })
                    }
                })
        } else {
            await Pengujian
                .aggregate([
                    { $match: { $or: [{ nouji: { $regex: new RegExp("^" + filter.toLowerCase(), "i") } }, { statuspenerbitan: Number(filter) },] } },
                    {
                        $lookup: {
                            from: "kendaraans",
                            localField: "nouji",
                            foreignField: "nouji",
                            as: "kendaraan"
                        }
                    }
                ])
                .skip(resPerPage * page - resPerPage)
                .limit(resPerPage)
                .sort({ _id: -1 })
                .exec((err, result) => {
                    if (err) {
                        return requestResponse.common_error
                    } else {
                        Pengujian
                            .aggregate([{ $group: { _id: null, totaldata: { $sum: 1 } } }])
                            .exec((count_error, count) => {
                                if (!count_error) {
                                    resolve(requestResponse.commonSuccessDataPaginate(result, count[0].totaldata, page, resPerPage, filter))

                                } else {
                                    reject(requestResponse.common_error)
                                }
                            })
                    }
                })
        }
    });

exports.getPengujianByDate = async (data) => new Promise((resolve, reject) => {
    console.log(data)
    Pengujian
        .aggregate([
            {
                $match: {
                    tgluji: {
                        "$gte": new Date(data.startDate),
                        "$lte": new Date(data.endDate)
                    }
                }
            }, {
                $lookup: {
                    from: "kendaraans",
                    localField: "nouji",
                    foreignField: "nouji",
                    as: "kendaraan"
                }
            }
        ])
        .then(res => {
            resolve(requestResponse.suksesWithData(res))
        })
        .catch((err) => {
            resolve(requestResponse.common_error)
        })
})

exports.getPengujianById = (id) => new Promise(async (resolve, reject) => {
    await Pengujian
        .aggregate([
            {
                $match: {
                    _id: ObjectId(id)
                }
            }, {
                $lookup: {
                    from: "kendaraans",
                    localField: "nouji",
                    foreignField: "nouji",
                    as: "kendaraan"
                }
            },
        ])
        .then(async (result) => {
            resolve(result);
        })
        .catch((err) => {
            console.log(err);
            reject(requestResponse.common_error);
        });
});

exports.generateNoUrut = (id) => new Promise((resolve, reject) => {
    Pengujian.find({ _id: ObjectId(id), no_urut: { $exists: true } })
        .then((results) => {
            if (results.length > 0) {
                resolve(requestResponse.suksesWithData(results[0]));
            } else {
                console.log(results)
                Pengujian.find({ "$expr": { "$and": [{ "$eq": [{ "$month": "$tgluji" }, new Date().getMonth() + 1] }, { "$eq": [{ "$year": "$tgluji" }, new Date().getFullYear()] }] } }).sort({ _id: -1 })
                    .then((result) => {
                        let noUrut;
                        let data = [];
                        if (result.length > 0) {
                            result.forEach(res => {
                                if (res.no_urut !== undefined) {
                                    data.push(res)
                                }

                            });
                            if (data.length > 0) {
                                let lastNoUrut = Math.max.apply(Math, data.map(function (o) { return o.no_urut; }))
                                Pengujian.updateOne({ _id: ObjectId(id) }, { no_urut: lastNoUrut+1 })
                                    .then(async (result) => {
                                        noUrut = lastNoUrut
                                        Pengujian.findOne({ _id: ObjectId(id) })
                                            .then(async (result) => {
                                                resolve(requestResponse.suksesWithData(result));
                                            })
                                            .catch((err) => {
                                                console.log(err);
                                                reject(requestResponse.common_error);
                                            });
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        reject(requestResponse.common_error);
                                    });

                            } else {
                                Pengujian.updateOne({ _id: ObjectId(id) }, { no_urut: 1 })
                                    .then(async (result) => {
                                        Pengujian.findOne({ _id: ObjectId(id) })
                                        .then(async (result) => {
                                            resolve(requestResponse.suksesWithData(result));
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            reject(requestResponse.common_error);
                                        });
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        reject(requestResponse.common_error);
                                    });

                            }
                        } else {
                            Pengujian.updateOne({ _id: ObjectId(id) }, { no_urut: 1 })
                                .then(async (result) => {
                                    Pengujian.find({ _id: ObjectId(id) })
                                    .then(async (result) => {
                                        resolve(requestResponse.suksesWithData(result));
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        reject(requestResponse.common_error);
                                    });
                                })
                                .catch((err) => {
                                    console.log(err);
                                    reject(requestResponse.common_error);
                                });
                        }
                        // console.log(result)
                        // result.no_urut = noUrut
                        // resolve(requestResponse.suksesWithData(result));
                        // this.generateNoUrut(id)
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(requestResponse.common_error);
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            reject(requestResponse.common_error);
        });

});

exports.pengujianTerakhir = (nouji) => new Promise((resolve, reject) => {
    Pengujian.findOne({ nouji: nouji }).sort({ _id: -1 })
        .then((result) => {
            console.log(result)
            resolve(requestResponse.suksesWithData(result));
        })
        .catch((err) => {
            console.log(err);
            reject(requestResponse.common_error);
        });
});
exports.deletePengujian = (_id, nouji) => new Promise((resolve, reject) => {
    Pengujian
        .deleteOne({ _id: ObjectId(_id) })
        .then(res => {
            knex('datapengujian')
                .where('nouji', nouji)
                .del()
                .then(res => {
                    console.log(res)
                    resolve(requestResponse.common_succes)
                })
                .catch((err) => {
                    resolve(requestResponse.common_error)
                })
            // resolve(requestResponse.common_succes)
        })
        .catch((err) => {
            resolve(requestResponse.common_error)
        })
})