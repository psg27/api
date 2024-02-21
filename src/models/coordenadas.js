const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const coordenadas = new Schema({
    latitud: { type: String },
    longitud: { type: String },
    ubicacion: { type: String },
    usuario: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("coordenadas", coordenadas, "coordenadas");
