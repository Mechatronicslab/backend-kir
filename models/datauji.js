const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataujiScehma = new Schema({
  no_plat: String,
  emisi: {
    fuel_type: String,
    HC: Number,
    CO: Number,
  }
});

module.exports = mongoose.model("data_pengujian", dataujiScehma);
