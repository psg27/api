const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const departamento = new Schema({
    folio: { type: String },
    nombre: { type: String },
    email: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("departamento", departamento, "departamento");
