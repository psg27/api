const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const eventos = new Schema({
    fecha: { type: String },
    folioOrden: { type: String },
    usuario: { type: String },
    tipoEvento: { type: String },
    motivoEvento: { type: String },
    leido: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("eventos", eventos, "eventos");
