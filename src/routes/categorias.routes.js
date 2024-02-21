const express = require("express");
const router = express.Router();
const categorias = require("../models/categorias");

// Registro de categorias
router.post("/registro", async (req, res) => {

    const categoriaRegistrar = categorias(req.body);
    await categoriaRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso de la categoria", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todas las categorias
router.get("/listar", async (req, res) => {
    categorias
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una categoria en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    categorias
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una categoria
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    categorias
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Categoria eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    categorias
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la categoria actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la categoria
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    await categorias
        .updateOne({ _id: id }, { $set: { nombre } })
        .then((data) => res.status(200).json({ mensaje: "Datos de la categoria actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
