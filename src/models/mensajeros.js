const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const mensajeros = new Schema({
    nombre: { type: String },
    telefono: { type: String },
    email: { type: String },
    modeloVehiculo: { type: String },
    placa: { type: String },
    economico: { type: String },
    fecha: { type: String },
    estado: { type: String },
    imagen: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("mensajeros", mensajeros, "mensajeros");