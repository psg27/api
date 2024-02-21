const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const gastosMensajero = new Schema({
    fecha: { type: String },
    concepto: { type: String },
    saldo: {type: String},
    cantidad: { type: String },
    comentarios: { type: String },
    imagen: { type: String },
    correoMensajero: {type: String},
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("gastosMensajero", gastosMensajero, "gastosMensajero");
