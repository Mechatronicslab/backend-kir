// const mysql = require("../setup");

exports.getDatapengujian = async (mysql) =>
  await new Promise(async (resolve, reject) => {
    mysql("datapengujian")
      .then((res) => {
        for (data of res) {
          delete data.fotodepansmall;
          delete data.fotobelakangsmall;
          delete data.fotokanansmall;
          delete data.fotokirismall;
        }
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(requestResponse.common_error);
      });
  });
