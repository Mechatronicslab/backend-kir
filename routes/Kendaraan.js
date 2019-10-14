const kendaraanController = require('../controller/KendaraanController')
const transaksi = require('../controller/Transaksi')
module.exports = router => {
    router.post('/kendaraan/simpandata', async (req, res) => {
        // console.log(req.body)
        await kendaraanController.postKendaraan(req.body.kendaraan)
            .then(() => {
                transaksi.createTransaksi(req.body.transaksi)
                    .then(result => res.json(result))
                    .catch(err => res.json(err))
            }).catch(err => {
                res.json(err)
                console.log(err)
            })

    })

    router.get('/kendaraan/get', async (req, res) => {
        await kendaraanController.getdata()
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    })

    router.post('/kendaraan/search', async (req, res) => {
        console.log(req.body)
        await kendaraanController.getdataById(req.body)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    })

    router.post('/kendaraan/getdataByDate', async (req, res) => {
        await kendaraanController.getdataByDate(req.body.start, req.body.end)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    })

    router.get('/getdetail/:id', async (req, res) => {
        await kendaraanController.getdetail(req.params.id)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    })

    router.post('/updatedata/:id', async (req, res) => {
        await kendaraanController.updatedata(req.body, req.params.id)
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

    router.post('/delete/:id', async (req, res) => {
        await kendaraanController.delete(req.params.id)
            .then(() => {
                res.json({ error: false })
            }).catch(() => {
                res.json({ error: true })
            })
    })

}
