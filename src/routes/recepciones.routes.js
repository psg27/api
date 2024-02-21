const express = require("express");
const router = express.Router();
const recepcion = require("../models/recepciones");

// Registro de recepcion
router.post("/registro", async (req, res) => {
        const recepcionRegistrar = recepcion(req.body);
        await recepcionRegistrar
            .save()
            .then((data) =>
                res.status(200).json(
                    {
                        mensaje: "Registro exitoso de la recepcion", datos: data
                    }
                ))
            .catch((error) => res.json({ message: error }));
});

// Obtener todos las recepciones
router.get("/listar", async (req, res) => {
    recepcion
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una recepcion en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    recepcion
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una recepcion
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    recepcion
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Recepcion eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    recepcion
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la recepcion actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del precios
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { folioOrden, materialesEnviados  } = req.body;

        await recepcion
            .updateOne({ _id: id }, { $set: { folioOrden, materialesEnviados } })
            .then((data) => res.status(200).json({ mensaje: "Datos de recepcion actualizados" }))
            .catch((error) => res.json({ message: error }));
});

module.exports = router;
