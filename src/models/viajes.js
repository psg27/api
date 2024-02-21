const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const viajes = new Schema({
    fecha: {type: String},
    tipoCliente: {type: String},
    clienteVisitar: { type: String },
    direccion: { type: String },
    ubicacion: { type: String },
    motivoViaje: { type: String },
    descripcionViaje: { type: String },
    ordenS: { type: String },
    cargoAñadido: { type: String },
    mensajero: { type: String },
    doctor: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("viajes", viajes, "viajes");
