const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const entregas = new Schema({
    folio: { type: String },
    mensajero: { type: String },
    correoMensajero: { type: String },
    fechayHoraEntrega: { type: String },
    ordenTrabajo: { type: String },
    motivoEntrega: { type: String },
    comentarios: { type: String },
    recibio: { type: String },
    ubicacion: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("entregas", entregas, "entregas");