const controller = require('../controller/AdministrasiController')
module.exports = router => {
    router.post('/administrasi/create', async (req, res) => {
        await controller.createAdministrasi(req.body)
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

    });

    router.get('/administrasi', async (req, res) => {
        await controller.getAdministrasi(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.json(err))

    });
}