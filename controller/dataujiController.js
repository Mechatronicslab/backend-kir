const datauji = require("../models/datauji");
const { requestResponse, generateIdTransaksi } = require("../setup");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getDataUji = (no_plat) =>
  new Promise((resolve, reject) => {
    datauji.findOne({no_plat : no_plat})
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
