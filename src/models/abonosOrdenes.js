const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const abonosOrdenes = new Schema({
    ordenServicio: { type: String },
    cantidadRecibida: { type: String },
    estado: { type: String },
    idRecibio: { type: String },
    hizoCargo: { type: String },
    aprobo: { type: String },
    fecha: {type: String}
}, {
    timestamps: true
});

module.exports = mongoose.model("abonosOrdenes", abonosOrdenes, "abonosOrdenes");
