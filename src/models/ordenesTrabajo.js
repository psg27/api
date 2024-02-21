const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const ordenesTrabajo = new Schema({
    folio: { type: String },
    folioODS: { type: String },
    fecha: { type: String },
    localidad: { type: String },
    nombreDoctor: { type: String },
    nombrePaciente: { type: String },
    precioTotal: { type: String },
    tipoDentadura: { type: String },
    servicios: { type: Array, default: [] },
    otros: { type: String },
    recibio: { type: String },
    fechaEntrada: { type: String },
    estado: { type: String },
    correoDoctor: { type: String },
    correoConsultorio: { type: String },
    telefonoDoctor: { type: String },
    prioridad: {type: String}
}, {
    timestamps: true
});

module.exports = mongoose.model("ordenesTrabajo", ordenesTrabajo, "ordenesTrabajo");