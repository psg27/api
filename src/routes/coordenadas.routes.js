const express = require("express");
const router = express.Router();
const coordenadas = require("../models/coordenadas");

// Registro de coordenadas
router.post("/registro", async (req, res) => {

    const coordenadaRegistrar = coordenadas(req.body);
    await coordenadaRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso de la coordenada", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos las coordenadas
router.get("/listar", async (req, res) => {
    coordenadas
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una coordenada en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    coordenadas
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una coordenada
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    coordenadas
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Coordenada eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    coordenadas
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la coordenada actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la coordenada
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { latitud, longitud, coordenadas } = req.body;

        await coordenadas
            .updateOne({ _id: id }, { $set: { latitud, longitud, coordenadas } })
            .then((data) => res.status(200).json({ mensaje: "Datos de la coordenada actualizados" }))
            .catch((error) => res.json({ message: error }));
});

module.exports = router;
