const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.login = async(data) =>
    new Promise((resolve, reject) => {
        User.findOne({
            username: data.username
        }).then(res => {
            if (res) {
                if (bcrypt.compareSync(data.password,res.password)) {
                    resolve(res)
                } else {
                    reject('Password Salah')
                }
            } else {
                reject('Username Tidak Ditemukan')
            }
        })
    })