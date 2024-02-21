const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const facturacion = new Schema({
    rfc: { type: String },
    razonSocial: { type: String }, 
    regimenFiscal: { type: String },
    calle: { type: String },
    numeroExterior: { type: String },
    numeroInterior: { type: String },
    codigoPostal: { type: String },
    colonia: { type: String },
    municipio: { type: String },
    estadoPais: { type: String },
    idUsuarioDatos: { type: String },
    observaciones: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("facturacion", facturacion, "facturacion");