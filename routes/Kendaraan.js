const kendaraanController = require('../controller/KendaraanController')
const multer = require('multer')
const uploadSetting = require('../config/uploadSetting')
const FTPConfig = require('../config/FTPConfig')
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
    router.post('/kendaraan/simpandata', fields, async (req, res) => {
        let data = JSON.parse(req.body.data)
        // if (!(data.transaksi.jenisPengujian === 'Numpang Uji')) {
        const tampakDepan = req.files['tampakDepan']
        const tampakBelakang = req.files['tampakBelakang']
        const tampakKanan = req.files['tampakKanan']
        const tampakKiri = req.files['tampakKiri']
        if (tampakDepan === undefined || tampakBelakang === undefined || tampakKanan === undefined || tampakKiri === undefined) {
            if (tampakDepan !== undefined) {
                Object.assign(data.transaksi, {
                    tampakDepan: tampakDepan[0].filename
                })
            }
            if (tampakBelakang !== undefined) {
                Object.assign(data.transaksi, {
                    tampakBelakang: tampakBelakang[0].filename
                })
            }
            if (tampakKanan !== undefined) {
                Object.assign(data.transaksi, {
                    tampakKanan: tampakKanan[0].filename
                })
            }
            if (tampakKiri !== undefined) {
                Object.assign(data.transaksi, {
                    tampakKiri: tampakKiri[0].filename
                })
            }
        } else {
            Object.assign(data.transaksi, {
                tampakDepan: tampakDepan[0].filename,
                tampakBelakang: tampakBelakang[0].filename,
                tampakKanan: tampakKanan[0].filename,
                tampakKiri: tampakKiri[0].filename
            })
        }
        // }
        if (data.transaksi === null) {
            kendaraanController.postKendaraan(data)
                .then(result => {
                    res.json(result)
                }).catch(err => {
                    res.json(err)
                })
        } else {
            if (data.transaksi.jenisPengujian === 'Numpang Uji') {
                kendaraanController.numpangUji(data)
                    .then(result => {
                        res.json(result)
                    }).catch(err => {
                        res.json(err)
                    })
            } else {
                kendaraanController.postKendaraan(data)
                .then(result => {
                    res.json(result)
                }).catch(err => {
                    res.json(err)
                    console.log(err)
                })
            }
        }

    })

    router.get('/kendaraan/get', async (req, res) => {
        kendaraanController.getdata()
            .then(result => {
                res.json(result)
            })
    })

    router.post('/kendaraan/search', async (req, res) => {
        kendaraanController.getdataById(req.body)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    })

    router.post('/kendaraan/getdataByDate', async (req, res) => {
        kendaraanController.getdataByDate(req.body.start, req.body.end)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    })

    router.get('/kendaraan/getdetail/:id', async (req, res) => {
        kendaraanController.getdetail(req.params.id)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    })

    router.post('/kendaraan/updatedata/:id', fields, async (req, res) => {
        kendaraanController.updatedata(req.body, req.params.id)
            .then(() => {
                res.json({
                    error: false
                })
            }).catch(() => {
                res.json({
                    error: true
                })
            })
    })

    router.post('/kendaraan/delete/:id', async (req, res) => {
        kendaraanController.delete(req.params.id)
            .then(() => {
                res.json({ error: false })
            }).catch(() => {
                res.json({ error: true })
            })
    })

}
