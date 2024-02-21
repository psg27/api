const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const establecimientos = new Schema({
    folio: { type: String },
    razonSocial: { type: String },
    estadoEstablecimiento: { type: String },
    municipio: { type: String },
    colonia: { type: String },
    calle: { type: String },
    numeroExterior: { type: String },
    numeroInterior: { type: String },
    codigoPostal: { type: String },
    telefono: { type: String },
    haceEsquina: { type: String },
    email: { type: String },
    observaciones: { type: String },
    horario: { type: String },
    estado: { type: String },
    alias: { type: String },
    doctor: { type: String },
    rfcDoctor: { type: String },
    imagen: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("establecimientos", establecimientos, "establecimientos");