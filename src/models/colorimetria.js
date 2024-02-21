const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const colorimetria = new Schema({
    nombre: { type: String },
    tonos: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("colorimetria", colorimetria, "colorimetria");