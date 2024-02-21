const express = require("express");
const router = express.Router();
const colorimetria = require("../models/colorimetria");

// Registro de colorimetria
router.post("/registro", async (req, res) => {

        const colorimetriaRegistrar = colorimetria(req.body);
        await colorimetriaRegistrar
            .save()
            .then((data) =>
                res.status(200).json(
                    {
                        mensaje: "Registro exitoso de la colorimetria", datos: data
                    }
                ))
            .catch((error) => res.json({ message: error }));
});

// Obtener todos las colorimetrias
router.get("/listar", async (req, res) => {
    colorimetria
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una colorimetria en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    colorimetria
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una colorimetria
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    colorimetria
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Colorimetria eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    colorimetria
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la colorimetria actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del admin
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, tonos } = req.body;

        await colorimetria
            .updateOne({ _id: id }, { $set: { nombre, tonos  } })
            .then((data) => res.status(200).json({ mensaje: "Datos de la colorimetria actualizados" }))
            .catch((error) => res.json({ message: error }));
});

module.exports = router;
