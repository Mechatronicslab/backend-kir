const userController = require('../controller/UserController')
const jwt = require('jsonwebtoken')
process.env.SECRET_KEY = Math.ceil(Math.random() * 1000000)
module.exports = router => {
    router.post('/user/login', async (req, res) => {
        userController.login({
            username: req.body.username,
            password: req.body.password
        }).then((result) => {
            console.log(result)
            let token=jwt.sign({
                id: result._id,
                username: result.username
            }, process.env.SECRET_KEY,{
                expiresIn: '1440m'
            })
            res.json({
                error: false,
                data: token,
                pesan: 'Berhasil Login'
            })
        }).catch(() => {
            res.json({
                error: true,
                pesan: 'Terjadi Kesalahan'
            })
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

}