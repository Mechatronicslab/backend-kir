const Kendaraan = require('../models/Kendaraan')

exports.postKendaraan = async (data) => {
    new Promise((resolve, reject) => {
        try {
            Kendaraan.create({
                noKendaraan: data.noKendaraan,
                merk: data.merk,
                type: data.type,
                jenisPeruntukan: data.jenisPeruntukan,
                tahunPembuatan: data.tahunPembuatan,
                tahunPenggunaan: data.tahunPenggunaan,
                nomorRangka: data.nomorRangka,
                nomorMesin: data.nomorMesin,
                nomorUji: data.nomorUji,
                tempatPengujian: data.tempatPengujian,
                tanggalTidakBerlaku: data.tanggalTidakBerlaku,
                namaPemilikKendaraan: data.namaPemilikKendaraan,
                alamatPerusahaan: data.alamatPerusahaan,
                jarakSumbu: data.jarakSumbu,
                panjangTotal: data.panjangTotal,
                lebarTotal: data.lebarTotal,
                tinggiTotal: data.tinggiTotal,
                jenisKaroseri: data.jenisKaroseri,
                bahanKaroseri: data.bahanKaroseri,
                jumlahTempatDuduk: data.jumlahTempatDuduk,
                jumlahTempatBerdiri: data.jumlahTempatBerdiri,
                keterangan: data.keterangan,
                jbbs: JSON.stringify(data.jbbs),
                bkks: JSON.stringify(data.bkks),
                dayaOrang: data.dayaOrang,
                dayaBarang: data.dayaBarang,
                jb: data.jb,
                mst: data.mst,
                bans: JSON.stringify(data.bans),
                roh: data.roh,
                foh: data.foh,
                pBak: data.pBak,
                lBak: data.lBak,
                tBak: data.tBak,
                vSil: data.vSil,
                date: data.date,
                srut: data.srut,
                bahanBakar: data.bahanBakar,
                dayaAngkutOrang: data.dayaAngkutOrang,
                jenis: data.jenis,
                umur: data.umur
            }).then(res => {
                if (res) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }).catch(() => {
                resolve(false)
            })
        } catch (error) {
            reject(error)
        }
    })
}

exports.getdata = () => 
    new Promise((resolve, reject) => {
        Kendaraan.find()
        .then(result => {
            resolve(result)
        }).catch(err => {
            console.log(err)
        })
    })

exports.getdataByDate = (start, end) =>
    new Promise((resolve, reject) => {
        let startDate = new Date(start)
        let endDate = new Date(end)
        Kendaraan.find({
            timeStamp: {
                $gte: startDate,
                $lt: endDate
            }
        })
        .then(result => {
            console.log(result)
            resolve(result)
        }).catch(err => {
            console.log(err)
        })
    })

exports.updatedata = (data, id) => 
new Promise((resolve, reject) => {
    Kendaraan.updateOne({
        _id: id
    },
    {
        noKendaraan: data.noKendaraan,
        merk: data.merk,
        type: data.type,
        jenisPeruntukan: data.jenisPeruntukan,
        tahunPembuatan: data.tahunPembuatan,
        tahunPenggunaan: data.tahunPenggunaan,
        nomorRangka: data.nomorRangka,
        nomorMesin: data.nomorMesin,
        nomorUji: data.nomorUji,
        tempatPengujian: data.tempatPengujian,
        tanggalTidakBerlaku: data.tanggalTidakBerlaku,
        namaPemilikKendaraan: data.namaPemilikKendaraan,
        alamatPerusahaan: data.alamatPerusahaan,
        jarakSumbu: data.jarakSumbu,
        panjangTotal: data.panjangTotal,
        lebarTotal: data.lebarTotal,
        tinggiTotal: data.tinggiTotal,
        jenisKaroseri: data.jenisKaroseri,
        bahanKaroseri: data.bahanKaroseri,
        jumlahTtempatDuduk: data.jumlahTtempatDuduk,
        jumlahTtempatberdiri: data.jumlahTtempatberdiri,
        keterangan: data.keterangan,
        jbbs: JSON.stringify(data.jbbs),
        bkks: JSON.stringify(data.bkks),
        dayaOrang: data.dayaOrang,
        dayaBarang: data.dayaBarang,
        jb: data.jb,
        mst: data.mst,
        bans: JSON.stringify(data.bans),
        roh: data.roh,
        foh: data.foh,
        pBak: data.pBak,
        lBak: data.lBak,
        tBak: data.tBak,
        vSil: data.vSil,
        date: data.date,
        srut: data.srut,
        bahanBakar: data.bahanBakar,
        dayaAngkutOrang: data.dayaAngkutOrang,
        jenis: data.jenis,
        umur: data.umur
    })
    .then(result => {
        resolve(result)
    }).catch(err => {
        console.log(err)
    })
})

exports.getdetail = (id) => 
new Promise((resolve, reject) => {
    Kendaraan.findOne({_id:id})
    .then(result => {
        resolve(result)
    }).catch(err => {
        console.log(err)
    })
})

exports.delete = (id) => 
new Promise((resolve, reject) => {
    Kendaraan.deleteOne({_id:id})
    .then(result => {
        resolve(result)
    }).catch(err => {
        console.log(err)
    })
})