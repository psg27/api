const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const precios = new Schema({
    clasificacion: { type: String },
    tipoServicios: { type: String },
    servicios: { type: String },
    materiales: { type: Array, default: [] },
    piezas: { type: Array, default: [] },
    precio: { type: String },
    sistemaColorPrincipal: { type: String },
    otrosColores: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("precios", precios, "precios");