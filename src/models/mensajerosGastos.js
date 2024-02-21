const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const mensajerosGastos = new Schema({
    nombreCliente: { type: String },
    correoCliente: { type: String },
    fecha: {type: String},
    gastos: { type: String },
    viaticos: {type: String},
    saldo: {type: String},
    diferencia: {type: String},
    fechayHora: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("mensajerosGastos", mensajerosGastos, "mensajerosGastos");
