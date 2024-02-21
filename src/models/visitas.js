const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const visitas = new Schema({
    numeroRuta: { type: String },
    ruta: { type: String },
    nombreMensajero: { type: String },
    vehiculoAsignado: { type: String },
    numeroEconomico: { type: String },
    horaInicio: { type: String },
    observaciones: { type: String },
    fecha: { type: String },
    estado: { type: String },
    correoMensajero: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("visitas", visitas, "visitas");