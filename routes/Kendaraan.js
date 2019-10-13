const kendaraanController = require('../controller/KendaraanController')
module.exports = router => {
    router.post('/kendaraan/simpandata', async (req, res) => {
        // console.log(req.body)
        kendaraanController.postKendaraan(req.body)
            .then((result) => {
                res.json(result)
                console.log(result)
            }).catch(err => {
                res.json(err)
                console.log(err)
            })

    })

    router.get('/kendaraan/get', async (req, res) => {
        kendaraanController.getdata()
            .then(result => {
                res.json(result)
            })
    })

    router.post('/kendaraan/search', async (req, res) => {
        console.log(req.body)
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

    router.get('/getdetail/:id', async (req, res) => {
        kendaraanController.getdetail(req.params.id)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    })

    router.post('/updatedata/:id', async (req, res) => {
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

    router.post('/delete/:id', async (req, res) => {
        kendaraanController.delete(req.params.id)
            .then(() => {
                res.json({ error: false })
            }).catch(() => {
                res.json({ error: true })
            })
    })

}
