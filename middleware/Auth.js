const UserModels = require('../models/User')
const decoder = require('jwt-decode')
const tokenErrorResponse = {
  tokenError: true,
  pesan: 'Sesi Anda Telah Habis / Akun Digunakan Orang Lain'
}
exports.auth = (req, res, next) => {
    if (req.headers.token === undefined) {
        res.json(tokenErrorResponse)
    } else {
        try {
            console.log(req.headers)
            let token = decoder(req.headers.token)
            if (token.tag === 'unlogged') {
                next()
            } else {
                UserModels.findOne({
                    username: token.username
                }).then(result => {
                    if (result.sessionToken !== token.sessionToken) {
                        res.json(tokenErrorResponse)
                    } else {
                        if (result.status === token.tag) {
                            next()
                        } else {
                            res.json(tokenErrorResponse)
                        }
                    }
                })
            }
        } catch (error) {
            res.json(tokenErrorResponse)
        }
    }
}

