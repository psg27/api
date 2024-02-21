const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const almacenMateriasPrimas = new Schema({
    clave: { type: String },
    claveAlterna: { type: String },
    producto: { type: String },
    minimo: { type: String },
    maximo: { type: String },
    existencia: { type: String },
    unidadMedida: { type: String },
    entrada: { type: String },
    salida: { type: String },
    devolucion: { type: String },
    existenciaReal: { type: String },
    ubicacion: { type: String },
    departamento: { type: String },
    categoria: { type: String },
    estado: { type: String },
    imagen: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("almacenMateriasPrimas", almacenMateriasPrimas, "almacenMateriasPrimas");