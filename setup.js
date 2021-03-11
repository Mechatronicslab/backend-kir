const config = require("./config/config.json");
const mongodbUri = config["database"]["production"]["uri"];
const client = require("mongoose");
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "sql.server.pptik.id",
    user: "kir",
    password: "",
    database: "kir",
  },
  pool: { min: 0, max: 20 },
});
const options = {
  useNewUrlParser: true,
  autoIndex: true, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  //buffemessageaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

function dbConnect() {
  return new Promise((resolve, reject) => {
    client.Promise = global.Promise;
    client.connect(mongodbUri, options, (err, database) => {
      if (err) {
        console.log("Connected to mongodb server failed");
        reject(err);
      } else {
        console.log("connect to db success");
        knex
          .raw("SELECT 'test connection';")
          .then((message) => {
            console.log("mysql connected");
            // db = database;
            // resolve(database);
            resolve(knex);
          })
          .catch((err) => {
            // Failure / timeout
            console.log(err);
            reject(err);
          });
        // resolve(database);
      }
    });
  });
}

const generateIdTransaksi =
  "TRX" +
  Math.floor(Math.random() * 100000000) +
  new Date().getTime().toString();

const requestResponse = {
  data_not_found: {
    error: true,
    rc: "0000",
    message: "Data Tidak Ditemukan",
  },
  common_success: {
    error: false,
    rc: "0000",
    message: "Berhasil memuat permintaaan",
  },
  suksesWithData: (data) => {
    return {
      error: false,
      rc: "0000",
      message: "Berhasil memuat permintaaan",
      data: data,
    };
  },
  account_not_found: {
    error: true,
    rc: "401",
    message: "Cek kembali username / password anda",
  },
  common_error: {
    error: true,
    rc: "5000",
    message:
      "Server tidak merespon, silahkan hubungi call center untuk info lebih lanjut",
  },
  duplicatePrimary: {
    error: true,
    rc: "5100",
    message: "Data Sudah Ada",
  },
  token_invalid: {
    error: true,
    rc: "0030",
    message: "Akses ditolak! Sesi Anda telah berakhir atau tidak valid",
  },
};

module.exports = {
  requestResponse,
  mongodbUri,
  dbConnect,
  generateIdTransaksi,
  knex
};
