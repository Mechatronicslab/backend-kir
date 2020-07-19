const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const objectID = require('mongoose').Types.ObjectId
process.env.SECRET_KEY = Math.ceil(Math.random() * 1000000)
exports.login = async(data) =>
    new Promise((resolve, reject) => {
        User.findOne({
            username: data.username
        }).then(res => {
            if (res) {
                if (bcrypt.compareSync(data.password,res.password)) {
                    const dataUser = {
                        id: res._id,
                        username: res.username,
                        role: res.role,
                        nama : res.nama
                    }
                    let token = jwt.sign(dataUser, process.env.SECRET_KEY,{
                        expiresIn: '1440m'
                    })
                    User.updateOne({
                        _id: objectID(res._id)
                    },{
                        sessionToken: token
                    }, () => {
                        resolve({
                            error: false,
                            token: token
                        })
                    })
                } else {
                    reject({
                        error: true,
                        pesan: 'Password Salah'
                    })
                }
            } else {
                reject({
                    error: true,
                    pesan: 'Username Tidak Ditemukan'
                })
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
