const dataujiController = require("../controller/dataujiController");
const multer = require("multer");
const uploadSetting = require("../config/uploadSetting");
const fields = uploadSetting
    .upload
    .fields([
        {
            name: "tampakDepan",
            maxCount: 1
        }, {
            name: "tampakBelakang",
            maxCount: 1
        }, {
            name: "tampakKanan",
            maxCount: 1
        }, {
            name: "tampakKiri",
            maxCount: 1
        }
    ]);

module.exports = (router) => {
    router.get("/datauji/", (req, res) => {
        dataujiController
            .getDataUji()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    router.get("/datauji/:nouji", (req, res) => {
        dataujiController
            .getDataUjiByNoUji(req.params.nouji)
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    router.post("/datauji/create", fields, (req, res) => {
        const tampakDepan = req.files["tampakDepan"];
        const tampakBelakang = req.files["tampakBelakang"];
        const tampakKanan = req.files["tampakKanan"];
        const tampakKiri = req.files["tampakKiri"];
        let data = JSON.parse(req.body.pengujian);
        data.fotodepansmall = tampakDepan[0].filename;
        data.fotobelakangsmall = tampakBelakang[0].filename;
        data.fotokirismall = tampakKiri[0].filename;
        data.fotokanansmall = tampakKanan[0].filename;
        dataujiController
            .create(data)
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.json(err);
            });
    });
};
