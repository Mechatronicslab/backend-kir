const controller = require('../controller/Transaksi')
module.exports = router => {
    router.post('/transaksi/create', async (req, res) => {
        await controller.createTransaksi(req.body)
            .then(result => res.json(result))
            .catch(err => res.json(err))

    });

    router.put('/administrasi/update/:id', async (req, res) => {
        await controller.updateAdministrasi(req.params.id, req.body)
            .then(result => res.json(result))
            .catch(err => res.json(err))

    });

    router.delete('/administrasi/delete/:id', async (req, res) => {
        await controller.deleteAdministrasi(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.json(err))

    })

    router.get('/cek/:id', async (req, res) => {
        await controller.verfNumpangUji(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    })

    router.get('/transaksi/getall', async (req, res) => {
        await controller.getAll()
            .then(result => res.json(result))
            .catch(err => res.json(err))
    })

    router.post('/transaksi/getbydate', async (req, res) => {
        await controller.getByDate(req.body)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    })
}