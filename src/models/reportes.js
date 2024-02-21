const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const reportes = new Schema({
    tipo: { type: String },
    observaciones: { tipe: String },
    estado: { type: String },
    idOrdenServicio: { type: String },
    fecha: { type: String },
    estado: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("reportes", reportes, "reportes");