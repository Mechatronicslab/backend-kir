const dataujiController = require('../controller/dataujiController')
module.exports = router => {
    router.post('/getdatauji', (req, res) => {
        console.log(req.body)
        dataujiController.getDataUji(req.body.no_plat)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    })

    

}