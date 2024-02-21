const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const unidadesMedida = new Schema({
    folio: { type: String },
    nombre: { type: String },
    conversion: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("unidadesMedida", unidadesMedida, "unidadesMedida");
