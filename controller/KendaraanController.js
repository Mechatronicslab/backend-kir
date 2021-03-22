const Kendaraan = require("../models/Kendaraan");
const Pengujian = require("../models/Pengujian");
const administrasi = require("../models/Administrasi");
const transaksi = require("../models/Transaksi");
const { requestResponse, generateIdTransaksi } = require("../setup");
const ObjectId = require("mongoose").Types.ObjectId;
exports.create = (kendaraan) => new Promise(async (resolve, reject) => {
    await Kendaraan
        .create(kendaraan)
        .then(() => {
            resolve(requestResponse.common_success)
        })
        .catch((err) => {
            reject(requestResponse.common_error);
        });
});

exports.numpangUji = (data) => new Promise((resolve, reject) => {
    let idTransaksi = {
        idTransaksi: generateIdTransaksi
    };
    Object.assign(data.kendaraan.tanggalTidakBerlaku, idTransaksi);
    Object.assign(data.kendaraan.date, idTransaksi);
    Object.assign(data.transaksi, idTransaksi);
    transaksi
        .create(data.transaksi)
        .then(() => {
            Kendaraan
                .findOne({ nomorUji: data.kendaraan.nomorUji })
                .then((res) => {
                    if (res === null) {
                        Kendaraan
                            .create(data.kendaraan)
                            .then(() => {
                                resolve(requestResponse.common_success);
                            });
                    } else {
                        const kendaraan = data.kendaraan;
                        const tanggalTidakBerlaku = kendaraan.tanggalTidakBerlaku;
                        const date = kendaraan.date;
                        delete kendaraan.tanggalTidakBerlaku;
                        delete kendaraan.date;
                        Kendaraan
                            .updateOne({
                                nomorUji: kendaraan.nomorUji
                            }, {
                                $set: kendaraan,
                                $addToSet: {
                                    tanggalTidakBerlaku: tanggalTidakBerlaku,
                                    date: date
                                }
                            })
                            .then(() => {
                                resolve(requestResponse.common_success);
                            });
                    }
                })
                .catch(() => {
                    reject(requestResponse.common_error);
                });
        });
});

exports.getdata = () => new Promise((resolve, reject) => {
    Kendaraan
        .find({ $or: [{ deleted: null }, { deleted: false }] })
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        });
});

exports.searchKendaraan = (filter) => new Promise((resolve, reject) => {
    Kendaraan
        .find({ nouji: { $regex: new RegExp("^" + filter.toLowerCase(), "i") } })
        .limit(20)
        .sort({ _id: -1 })
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        });
});


exports.getdataById = (body) => new Promise(async (resolve, reject) => {
    await Kendaraan
        .findOne({
            nouji: body.nouji
        })
        .then(async (kendaraan) => {
            if (kendaraan) {
                await administrasi
                    .findOne({ jenisPengujian: body.jenis })
                    .then(async (result) => {
                        let data = Object.assign({ kendaraan: kendaraan, administrasi: result });
                        resolve(data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } else {
                reject(requestResponse.data_not_found);
            }
        })
        .catch((err) => {
            reject(err);
        });
});

exports.getdataByDate = (start, end) => new Promise((resolve, reject) => {
    let startDate = new Date(start);
    let endDate = new Date(end);
    Kendaraan
        .find({
            created_at: {
                $gte: startDate,
                $lte: endDate
            },
            deleted: false
        })
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.updatedata = (data, id) => new Promise((resolve, reject) => {
    Kendaraan
        .updateOne({
            _id: ObjectId(id)
        }, data)
        .then((result) => {
            resolve(requestResponse.common_success)
        })
        .catch(() => {
            console.log(requestResponse.common_error)
        });
});

exports.mutasi = (data, id) => new Promise((resolve, reject) => {
    Kendaraan
        .updateOne({
            _id: id
        }, data)
        .then(() => {
            resolve({ error: false, message: "Berhasil Mutasi Kendaraan" });
        })
        .catch(() => {
            resolve({ error: false, message: "Gagal Mutasi Kendaraan" });
        });
});

exports.getdetail = (id) => new Promise((resolve, reject) => {
    try {
        Kendaraan
            .findOne({
                _id: ObjectId(id)
            })
            .then((result) => {
                if (result) {
                    resolve(requestResponse.suksesWithData(result))
                } else {
                    reject(requestResponse.data_not_found)
                }
            })
            .catch((err) => {
                reject(err)
            })
    } catch (e) {
        reject(requestResponse.data_not_found)
    }
});

exports.delete = (id) => new Promise((resolve, reject) => {
    Kendaraan
        .updateOne({
            _id: ObjectId(id)
        },
            {
                deleted: true
            })
        .then(() => {
            resolve(requestResponse.common_success)
        })
        .catch(() => {
            reject(requestResponse.common_error)
        })
});
