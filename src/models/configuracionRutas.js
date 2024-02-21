const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const configuracionRutas = new Schema({
    folio: { type: String },
    nombre: [{ type: String }],
    descripcion: { type: String },
    coordenadas: { type: Object },
    estado: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("configuracionRutas", configuracionRutas, "configuracionRutas");