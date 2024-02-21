const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const preciosOrden = new Schema({
    ordenServicio: {type: String},
    tipo: {type: String},
    concepto: {type: String},
    cantidad: {type: String},
    correoRegistro: {type: String},
    fecha: {type: String},
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("preciosOrden", preciosOrden, "preciosOrden");
