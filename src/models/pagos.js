const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const pagos = new Schema({
    correoCliente: { type: String },
    nombreCliente: { type: String },
    concepto: { type: String },
    cantidad: { type: String },
    formaPago: { type: String },
    realizaOperacion: { type: String },
    fecha: {type: String},
    estado: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("pagos", pagos, "pagos");