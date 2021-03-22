const datauji = require("../models/datauji");
const {requestResponse, knex} = require("../setup");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getDataUji = () => new Promise(async (resolve, reject) => {
    await datauji
        .find().sort({_id : -1})
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
    console.log(data)
    await datauji
        .updateOne({nouji : data.nouji},data, {upsert: true})
        .then((result) => {
            resolve(requestResponse.common_success);
        })
        .catch((err) => {
            reject(err);
        });
});


