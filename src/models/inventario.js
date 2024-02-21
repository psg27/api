const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const inventario = new Schema({
    nombreArticulo: { type: String },
    unidad: { type: String },
    cantidad: { type: String },
    estado: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("inventario", inventario, "inventario");