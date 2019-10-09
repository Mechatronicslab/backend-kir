const user = require('express').Router()
const userController = require('../controller/UserController')

user.post('/login', async (req, res) => {
    userController.login({
        username: req.body.username,
        password: req.body.password
    }).then((result) => {
        res.json({
            error: false,
            data: result,
            pesan: 'Berhasil Login'
        })
    }).catch((err) => {
        res.json({
            error: true,
            pesan: err
        })
    })
})

module.exports = user