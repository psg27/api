const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const proveedores = new Schema({
    folio: { type: String },
    nombre: { type: String },
    estado: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("proveedores", proveedores, "proveedores");