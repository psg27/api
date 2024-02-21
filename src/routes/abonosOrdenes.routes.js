const express = require("express");
const router = express.Router();
const abonosOrdenes = require("../models/abonosOrdenes");

// Registro de un abono de orden
router.post("/registro", async (req, res) => {

    const abonosOrdenesRegistrar = abonosOrdenes(req.body);
    await abonosOrdenesRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso del abono de la orden", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los abonos de las ordenes
router.get("/listar", async (req, res) => {
    abonosOrdenes
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los abonos de las ordenes
router.get("/listarFecha", async (req, res) => {
    const { fecha } = req.query;
    abonosOrdenes
        .find({ fecha })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


// Obtener un abono e orden en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    abonosOrdenes
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un abono de orden
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    abonosOrdenes
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Abono de orden eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { aprobo, estado } = req.body;
    abonosOrdenes
        .updateOne({ _id: id }, { $set: { aprobo, estado } })
        .then((data) => res.status(200).json({ mensaje: "Pago Aprobado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del abono de la orden
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { ordenServicio, cantidadRecibida, idRecibio, hizoCargo, aprobo, fecha } = req.body;

    await abonosOrdenes
        .updateOne({ _id: id }, { $set: { ordenServicio, cantidadRecibida, idRecibio, hizoCargo, aprobo, fecha } })
        .then((data) => res.status(200).json({ mensaje: "Datos del abono de la orden actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
