const pengujianController = require("../controller/PengujianController");

module.exports = (router) => {
  router.get("/pengujian/", async (req, res) => {
    pengujianController
      .getPengujian()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.get("/pengujian/:id", async (req, res) => {
    pengujianController
      .getPengujianById(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.get("/pengujianTerakhir/:nouji", async (req, res) => {
    pengujianController
      .pengujianTerakhir(req.params.nouji)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.post('/pengujianBydate/', async (req, res) => {
    console.log(req.body)
    await pengujianController.getPengujianByDate(req.body)
      .then(result => res.json(result))
      .catch(err => res.json(err))
  })

  router.delete('/pengujian/:_id/:nouji', async (req, res) => {
    await pengujianController.deletePengujian(req.params._id , req.params.nouji)
      .then(result => res.json(result))
      .catch(err => res.json(err))
  })


};


