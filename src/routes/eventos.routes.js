const express = require("express");
const router = express.Router();
const eventos = require("../models/eventos");

// Registro de eventos
router.post("/registro", async (req, res) => {

    const eventoRegistrar = eventos(req.body);
    await eventoRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso del evento", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los eventos
router.get("/listar", async (req, res) => {
    eventos
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un evento en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    eventos
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los doctores
router.get("/obtenerEventosPorFolio", async (req, res) => {
    const { folioOrden } = req.query;

    eventos
        .find({ folioOrden })
        .sort({ fecha: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un evento
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    eventos
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Evento eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    eventos
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del evento actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del evento
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { leido } = req.body;

    await eventos
        .updateOne({ _id: id }, { $set: { leido } })
        .then((data) => res.status(200).json({ mensaje: "Datos del evento actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
