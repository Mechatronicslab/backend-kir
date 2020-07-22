const userController = require('../controller/UserController')
const jwt = require('jsonwebtoken')
process.env.SECRET_KEY = Math.ceil(Math.random() * 1000000)
module.exports = router => {
    router.post('/user/login', async (req, res) => {
        userController.login({
            username: req.body.username,
            password: req.body.password,
        }).then((result) => {
            res.json(result)
        }).catch((err) => {
            res.json(err)
        })
    })

    router.post('/user/changepassword/:id', (req, res) => {
        userController.changePassword(req.body, req.params.id)
            .then(result => {
                res.json(result)
            }).catch(err => {
                res.json(err)
            })
    })

    router.get('/kodewilayah/', (req, res) => {
        userController.getKodeWilayah()
            .then(result => {
                res.json(result)
            }).catch(err => {
                res.json(err)
            })
    })

}