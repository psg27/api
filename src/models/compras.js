const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const compras = new Schema({
    folio: { type: String },
    status: { type: String },
    fecha: { type: String },
    nombreSolicitante: {type: String},
    departamento: {type: String},
    materiales: { type: Array, default: [] },
    observaciones: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("compras", compras, "compras");