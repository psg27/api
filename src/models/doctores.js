const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const doctores = new Schema({
    folio: { type: String },
    idUsuario: { type: String },
    nombre: { type: String },
    apellidoPaterno: { type: String },
    apellidoMaterno: { type: String },
    fechaNacimiento: { type: String },
    telefonoCelular: { type: String },
    email: { type: String },
    rfc: { type: String },
    observaciones: { type: String },
    password: { type: String },
    idEstablecimiento: { type: String },
    estado: { type: String },
    consultorio: { type: String },
    nombreConsultorio: { type: String },
    correoConsultorio: { type: String },
    imagen: { type: String },
    calle: { type: String },
    nExterior: { type: String },
    nInterior: { type: String },
    colonia: { type: String },
    estadoDom: { type: String },
    municipio: { type: String },
    cPostal: { type: String },
    referencia: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("doctores", doctores, "doctores");