const express = require("express");
const router = express.Router();
const evaluaciones360 = require("../models/evaluaciones360");

// Registro de evaluacion360
router.post("/registro", async (req, res) => {

    const evaluaciones360Registrar = evaluaciones360(req.body);
    await evaluaciones360Registrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso de la evaluacion360", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos las evaluaciones360
router.get("/listar", async (req, res) => {
    evaluaciones360
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una evaluacion360 en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    evaluaciones360
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una evaluacion360 en especifico
router.get("/obtenerUltimo", async (req, res) => {

    evaluaciones360
        .findOne()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una evaluaciones360
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    evaluaciones360
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Evaluacion360 eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    evaluaciones360
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la evaluacion360 actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la evaluacion360
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { neumaticos,  fluidos, frenos, luces, bateria, documentacion, equipoEmergencia, combustible, gps, limpiaparabrisas } = req.body;

    await evaluaciones360
        .updateOne({ _id: id }, { $set: { neumaticos,  fluidos, frenos, luces, bateria, documentacion, equipoEmergencia, combustible, gps, limpiaparabrisas } })
        .then((data) => res.status(200).json({ mensaje: "Datos de la evaluacion360 actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
