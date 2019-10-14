const controller = require('../controller/Transaksi')
module.exports = router => {
    router.post('/transaksi/create', async (req, res) => {
        await controller.createTransaksi(req.body)
            .then(result => res.json(result))
            .catch(err => res.json(err))

    });

    router.put('/transaksi/update/:id', async (req, res) => {
        await controller.updateAdministrasi(req.params.id, req.body)
            .then(result => res.json(result))
            .catch(err => res.json(err))

    });

    router.delete('/transaksi/delete/:id', async (req, res) => {
        await controller.deleteAdministrasi(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.json(err))

    });

    router.get('/transaksi/', async (req, res) => {
        await controller.getTransaksi(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.json(err))

    });
}