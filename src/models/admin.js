const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const admin = new Schema({
    idUsuario: { type: String },
    nombre: { type: String },
    email: { type: String },
    password: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("admin", admin, "admin");
