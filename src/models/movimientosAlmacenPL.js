const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const movimientosAlmacenPL = new Schema({
    idArticuloAPL: { type: String },
    producto: { type: String },
    tipo: { type: String },
    cantidadMovimiento: { type: String },
    unidadMedida: { type: String },
    departamento: { type: String },
    observaciones: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("movimientosAlmacenPL", movimientosAlmacenPL, "movimientosAlmacenPL");