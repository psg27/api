const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const vehiculos = new Schema({
    conductor: { type: String },
    modelo: { type: String },
    placa: { type: String },
    numEconomico: { type: String },
    color: { type: String },
    kilometrajeActual: { type: String },
    kilometrajeRecorrido: { type: String },
    imagen: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("vehiculos", vehiculos, "vehiculos");