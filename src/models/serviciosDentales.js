const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const serviciosDentales = new Schema({
    clasificacion: { type: String },
    tipo: { type: String },
    servicio: { type: String },
    precio: { type: String },
    colorimetria: {type: String},
    tonos: {type: String},
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("serviciosDentales", serviciosDentales, "serviciosDentales");