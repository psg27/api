const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const servicio = new Schema({
    folio: { type: String },
    clasificacion: { type: String },
    material: { type: String },
    pieza: { type: String },
    precio: { type: String },
    descripcionAdicional: { type: String },
    sistemaColor: { type: String },
    distencion: { type: String },
    diente: { type: Array, default: [] },
    tonoInferior: { type: String },
    tonoMedio: { type: String },
    tonoSuperior: { type: String },
    imagen1: { type: String },
    imagen2: { type: String },
    imagen3: { type: String },
    imagen4: { type: String },
    imagen5: { type: String },
    estado: { type: String },
    imagenEsquema: { type: String },
    imagenDiente: { type: String },
    folioDepartamento: { type: String },
    email: { type: String },
    departamento: { type: String },
    prioridad: { type: String },
    ODT: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("servicio", servicio, "servicio");