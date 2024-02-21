const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const cuentasPagar = new Schema({
    concepto: { type: String },
    monto: { type: String },
    idProveedor: { type: String },
    vencimiento: { type: String },
    estado: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("cuentasPagar", cuentasPagar, "cuentasPagar");