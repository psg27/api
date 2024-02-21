const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const ordenesServicio = new Schema({
    folio: { type: String },
    fecha: { type: String },
    localidad: { type: String },
    nombreDoctor: { type: String },
    nombrePaciente: { type: String },
    servicios: { type: String },
    precioTotal: { type: String },
    tipoDentadura: { type: String },
    servicios: { type: Array, default: [] },
    otros: { type: String },
    recibio: { type: String },
    fechaEntrada: { type: String },
    estado: { type: String },
    correoDoctor: { type: String },
    correoConsultorio: { type: String },
    imagen1: { type: String },
    observacionesImagen1: { type: String },
    imagen2: { type: String },
    observacionesImagen2: { type: String },
    imagen3: { type: String },
    observacionesImagen3: { type: String },
    imagen4: { type: String },
    observacionesImagen4: { type: String },
    imagen5: { type: String },
    observacionesImagen5: { type: String },
    imagen6: { type: String },
    observacionesImagen6: { type: String },
    mensajero: { type: String },
    correoMensajero: { type: String },
    telefonoMensajero: { type: String },
    fechaProgramadaRecoleccion: { type: String },
    fechaRealProgramacion: { type: String },
    cantidadMaterialEntregado: { type: String },
    telefonoDoctor: { type: String },
    direccionConsultorio: { type: String },
    cargoOrden: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("ordenesServicio", ordenesServicio, "ordenesServicio");