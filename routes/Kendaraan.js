const kendaraan = require('express').Router()
// const Kendaraan = require('../models/Kendaraan')
const kendaraanController = require('../controller/KendaraanController')

kendaraan.post('/simpandata', async (req,res) => {
    // console.log(req.body)
    kendaraanController.postKendaraan(req.body)
    .then((berhasil) => {
        if (berhasil) {
            res.json({
                error: false
            })
        } else {
            res.json({
                error: true
            })
        }
    }).catch(() => {
        res.json({
            error: true
        })
    })
    
})

kendaraan.get('/getdata', async (req,res) => {
    kendaraanController.getdata()
    .then(result => {
        res.json(result)
    })
})

kendaraan.post('/getdataByDate', async (req,res) => {
    kendaraanController.getdataByDate(req.body.start, req.body.end)
    .then(result => {
        res.json(result)
    })
})

kendaraan.get('/getdetail/:id', async (req,res) => {
    kendaraanController.getdetail(req.params.id)
    .then(result => {
        res.json(result)
    })
})

kendaraan.post('/updatedata/:id', async (req,res) => {
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

kendaraan.post('/delete/:id', async (req,res) => {
    kendaraanController.delete(req.params.id)
    .then(() => {
        res.json({error: false})
    }).catch(() => {
        res.json({error: true})
    })
})

module.exports = kendaraan
