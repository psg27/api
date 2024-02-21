const express = require("express");
const router = express.Router();
const mensajeros = require("../models/mensajeros");

// Registro de mensajeros
router.post("/registro", async (req, res) => {

    const mensajeroRegistrar = mensajeros(req.body);
    await mensajeroRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso del mensajero", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los mensajeros
router.get("/listar", async (req, res) => {
    mensajeros
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un mensajero en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    mensajeros
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un mensajero
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    mensajeros
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Mensajero eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    mensajeros
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del mensajero actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del mensajero
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, email, modeloVehiculo, placa, economico, imagen } = req.body;

    await mensajeros
        .updateOne({ _id: id }, { $set: { nombre, telefono, email, modeloVehiculo, placa, economico, imagen } })
        .then((data) => res.status(200).json({ mensaje: "Datos del mensajero actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
