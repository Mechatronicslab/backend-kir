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

exports.changePassword = async(data, id) =>
    new Promise((resolve, reject) => {
        User.findOne({
            _id: id
        }).then(res => {
            if (res) {
                if (bcrypt.compareSync(data.oldPassword,res.password)) {
                    bcrypt.hash(data.newPassword,10, (err,hash) => {
                        User.updateOne({
                            _id: id
                        }, {
                            password: hash
                        }).then(() => {
                            resolve({
                                error: false,
                                msg: 'Berhasil Merubah Password'
                            })
                        })
                    })
                } else {
                    reject({
                        error: true,
                        msg: 'Password Lama Salah'
                    })
                }
            } else {
                reject('Data Tidak Ditemukan')
            }
        })
    })
