const express = require("express");
const router = express.Router();
const reportes = require("../models/reportes");

// Registro de reportes
router.post("/registro", async (req, res) => {

    const reporteRegistrar = reportes(req.body);
    await reporteRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso del reporte", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los reportes
router.get("/listar", async (req, res) => {
    reportes
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un reporte en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    reportes
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un reporte
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    reportes
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Reportes eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    reportes
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del reporte actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la orden de trabajo
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { tipo, observaciones, estado, idOrdenServicio, fecha } = req.body;

    await reportes
        .updateOne({ _id: id }, { $set: { tipo, observaciones, estado, idOrdenServicio, fecha } })
        .then((data) => res.status(200).json({ mensaje: "Datos del reporte actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
