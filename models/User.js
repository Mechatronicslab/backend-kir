const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    nama: {
        type: String
    },
    alamat: {
        type: String
    },
    noTelp: {
        type: String
    },
    sessionToken: {
        type: String
    }
})

module.exports = User = mongoose.model('user', UserSchema)