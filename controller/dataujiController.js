const datauji = require("../models/datauji");
const {requestResponse, generateIdTransaksi} = require("../setup");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getDataUji = () => new Promise(async (resolve, reject) => {
    await datauji
        .find()
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        });
});

exports.getDataUjiByNoUji = (nouji) => new Promise(async (resolve, reject) => {
    await datauji
        .findOne({nouji : nouji})
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        });
});

exports.create = (data) => new Promise(async (resolve, reject) => {
    await datauji
        .create(data)
        .then((result) => {
            resolve(requestResponse.common_success);
        })
        .catch((err) => {
            reject(err);
        });
});
