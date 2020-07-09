const pengujianController = require("../controller/PengujianController");

module.exports = (router) => {
  router.get("/pengujian/", async (req, res) => {
    pengujianController
      .getPengujian([])
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
