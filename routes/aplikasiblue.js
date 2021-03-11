const aplikasiblue = require('../controller/aplikasiblue')
module.exports = (router) => {
    router.get("/datapengujian", (req, res) => {
        const db = req.app.get("dbmysql");
        aplikasiblue
            .getDatapengujian(db)
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.json(err);
            });
    });
};