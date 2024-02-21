const express = require("express");
const router = express.Router();
const serviciosDentales = require("../models/serviciosDentales");

// Registro de servicios dentales
router.post("/registro", async (req, res) => {

    const serviciosDentalesRegistrar = serviciosDentales(req.body);
    await serviciosDentalesRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso de servicios dentales", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los servicios dentales
router.get("/listar", async (req, res) => {
    serviciosDentales
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un servicio dental en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    serviciosDentales
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un servicio dental
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    serviciosDentales
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Servicio dental eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    serviciosDentales
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del servicio dental actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del servicio dental
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { clasificacion, tipo, servicio, precio, colorimetria, tonos } = req.body;

    await serviciosDentales
        .updateOne({ _id: id }, { $set: { clasificacion, tipo, servicio, precio, colorimetria, tonos } })
        .then((data) => res.status(200).json({ mensaje: "Datos del servicio dental actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
