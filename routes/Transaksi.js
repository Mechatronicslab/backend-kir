const controller = require('../controller/Transaksi')
const uploadSetting = require('../config/uploadSetting')
const fields = uploadSetting.upload.fields([
    {
        name: 'tampakDepan',
        maxCount: 1
    },
    {
        name: 'tampakBelakang',
        maxCount: 1
    },
    {
        name: 'tampakKanan',
        maxCount: 1
    },
    {
        name: 'tampakKiri',
        maxCount: 1
    }
])
module.exports = router => {
    router.post('/transaksi/create', fields, async (req, res) => {
        const tampakDepan = req.files['tampakDepan']
        const tampakBelakang = req.files['tampakBelakang']
        const tampakKanan = req.files['tampakKanan']
        const tampakKiri = req.files['tampakKiri']
        let data = JSON.parse(req.body.data)
        if (tampakDepan === undefined || tampakBelakang === undefined || tampakKanan === undefined || tampakKiri === undefined) {
            if (tampakDepan !== undefined) {
                Object.assign(data, {
                    tampakDepan: tampakDepan[0].filename
                })
            }
            if (tampakBelakang !== undefined) {
                Object.assign(data, {
                    tampakBelakang: tampakBelakang[0].filename
                })
            }
            if (tampakKanan !== undefined) {
                Object.assign(data, {
                    tampakKanan: tampakKanan[0].filename
                })
            }
            if (tampakKiri !== undefined) {
                Object.assign(data, {
                    tampakKiri: tampakKiri[0].filename
                })
            }
        } else {
            Object.assign(data, {
                tampakDepan: tampakDepan[0].filename,
                tampakBelakang: tampakBelakang[0].filename,
                tampakKanan: tampakKanan[0].filename,
                tampakKiri: tampakKiri[0].filename
            })
        }
        await controller.createTransaksi(data)
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