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
        if (filter === 'null') {
            await Pengujian
                .aggregate([
                    { $match: { $or: [{ nouji: { $regex: ".*" } },{ statuspenerbitan: { $regex: ".*" } },] } },
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
                    { $match: { $or: [{ nouji: { $regex: new RegExp("^" + filter.toLowerCase(), "i") } },{ statuspenerbitan: Number(filter)},] } },
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