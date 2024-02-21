const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const saldosCliente = new Schema({
    nombreCliente: { type: String },
    correoCliente: { type: String },
    saldo: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("saldosCliente", saldosCliente, "saldosCliente");
