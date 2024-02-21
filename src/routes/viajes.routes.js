const express = require("express");
const router = express.Router();
const viajes = require("../models/viajes");

// Registro de viajes
router.post("/registro", async (req, res) => {

        const viajeRegistrar = viajes(req.body);
        await viajeRegistrar
            .save()
            .then((data) =>
                res.status(200).json(
                    {
                        mensaje: "Registro exitoso del viaje", datos: data
                    }
                ))
            .catch((error) => res.json({ message: error }));
});

// Obtener todos los viajes
router.get("/listar", async (req, res) => {
    viajes
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un viaje en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    viajes
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un viaje
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    viajes
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Viaje eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    viajes
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del viaje actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del viaje
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { clienteVisitar, tipoCliente, direccion, ubicacion, motivoViaje, descripcionViaje, cargoAñadido, mensajero, doctor } = req.body;

        await viajes
            .updateOne({ _id: id }, { $set: { clienteVisitar, tipoCliente, direccion, ubicacion, motivoViaje, descripcionViaje, cargoAñadido, mensajero, doctor } })
            .then((data) => res.status(200).json({ mensaje: "Datos del viaje actualizados" }))
            .catch((error) => res.json({ message: error }));
});

module.exports = router;
