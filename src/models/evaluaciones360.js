const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const evaluaciones360 = new Schema({
    vehiculo: { type: String },
    neumaticos: {
        presion: { type: String },
        condicion: { type: String },
    },
    fluidos: {
        aceiteMotor: { type: String },
        liquidoFrenos: { type: String },
        refrigeranteMotor: { type: String },
        liquidoTransmision: { type: String },
    },
    frenos: {
        estadoPastillas: { type: String },
        estadoDiscos: { type: String }
    },
    luces: {
        estadoLucesFrenos: { type: String },
        estadoLucesAtras: { type: String },
        estadoLucesTraseras: { type: String }
    },
    bateria: {
        estadoBateria: { type: String },
    },
    documentacion: {
        licenciaConducir: { type: String },
        tarjetaRegistro: { type: String },
        tarjetaSeguro: { type: String }
    },
    equipoEmergencia: {
        gato: { type: String },
        llave: { type: String },
        llantaRepuesto: { type: String },
        botiquin: { type: String }
    },
    combustible: {
        nivelCombustible: { type: String },
    },
    gps: {
        estado: { type: String }
    },
    limpiaparabrisas: {
        estadoLimpiaparabrisas: { type: String },
        nivelDeposito: { type: String }
    },
    imagenes: {type: Array, default: []},
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("evaluaciones360", evaluaciones360, "evaluaciones360");
