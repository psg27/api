const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const ubicaciones = new Schema({
    nombre: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("ubicaciones", ubicaciones , "ubicaciones");
