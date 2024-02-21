const express = require("express");
const router = express.Router();
const ubicaciones = require("../models/ubicaciones");

// Registro de ubicaciones
router.post("/registro", async (req, res) => {

    const ubicacionRegistrar = ubicaciones(req.body);
    await ubicacionRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso de la ubicacion", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todas las ubicaciones
router.get("/listar", async (req, res) => {
    ubicaciones
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una ubicacion en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    ubicaciones
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una ubicacion
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    ubicaciones
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Ubicacion eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    ubicaciones
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la ubicacion actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la ubicacion
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    await ubicaciones
        .updateOne({ _id: id }, { $set: { nombre } })
        .then((data) => res.status(200).json({ mensaje: "Datos de la ubicacion actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
