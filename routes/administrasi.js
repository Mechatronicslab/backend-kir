const controller = require('../controller/AdministrasiController')
module.exports = router => {
    router.post('/administrasi/create', async (req, res) => {
        await controller.createAdministrasi(req.body)
            .then(result => res.json(result))
            .catch(err => res.json(err))

    })

    router.put('/administrasi/update/:id', async (req, res) => {
        await controller.updateAdministrasi(req.params.id, req.body)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    })

    router.delete('/administrasi/delete/:id', async (req, res) => {
        await controller.deleteAdministrasi(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    })

    router.get('/administrasi/:jenisPengujian', async (req, res) => {
        // console.log(req.params.jenisPengujian.replace('%20', ' '))
        await controller.getAdministrasi(req.params.jenisPengujian.replace('%20', ' '))
            .then(result => res.json(result))
            .catch(err => res.json(err))
    })

}
