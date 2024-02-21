const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const recepciones = new Schema({
    folioOrden: { type: String },
    materialesEnviados: { type: Array, default: [] },
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
    usuario: { type: String },
    otros: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("recepciones", recepciones, "recepciones");