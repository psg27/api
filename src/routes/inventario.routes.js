const express = require("express");
const router = express.Router();
const inventario = require("../models/inventario");

// Registro de inventario
router.post("/registro", async (req, res) => {

    const inventarioRegistrar = inventario(req.body);
    await inventarioRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso de la inventario", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos las inventarios
router.get("/listar", async (req, res) => {
    inventario
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un inventario en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    inventario
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una inventario
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    inventario
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Inventario eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    inventario
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del inventario actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del inventario
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombreArticulo, unidad, cantidad } = req.body;

        await inventario
            .updateOne({ _id: id }, { $set: { nombreArticulo, unidad, cantidad } })
            .then((data) => res.status(200).json({ mensaje: "Datos del inventario actualizados" }))
            .catch((error) => res.json({ message: error }));
});

module.exports = router;
