const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = new Schema({
  kodewilayah : String ,
  namawilayah : String 
  
});

module.exports = mongoose.model("kode_wilayah", model);
