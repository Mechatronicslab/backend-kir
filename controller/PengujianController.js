const Kendaraan = require("../models/Kendaraan");
const Pengujian = require("../models/Pengujian");
const { requestResponse, generateIdTransaksi } = require("../setup");
const ObjectId = require("mongoose").Types.ObjectId;
exports.getPengujian = () =>
  new Promise(async (resolve, reject) => {
    await Pengujian.aggregate([
      {
        $lookup: {
          from: "kendaraans",
          localField: "nouji",
          foreignField: "nouji",
          as: "kendaraan",
        },
      },
    ])
      .then(async (result) => {
        resolve(requestResponse.suksesWithData(result));
      })
      .catch((err) => {
        console.log(err);
        reject(requestResponse.common_error);
      });
  });


  exports.getPengujianById = (id) =>
  new Promise(async (resolve, reject) => {
    await Pengujian.aggregate([
      { $match : { _id : ObjectId(id) } },
      {
        $lookup: {
          from: "kendaraans",
          localField: "nouji",
          foreignField: "nouji",
          as: "kendaraan",
        },
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