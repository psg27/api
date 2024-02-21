const express = require("express");
const router = express.Router();
const unidadesMedida = require("../models/unidadesMedida");

// Registro de unidades medida
router.post("/registro", async (req, res) => {

    const unidadesMedidaRegistrar = unidadesMedida(req.body);
    await unidadesMedidaRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso del unidades medida", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los unidades medidda
router.get("/listar", async (req, res) => {
    unidadesMedida
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una unidad de medida en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    unidadesMedida
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una unidad de medida
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    unidadesMedida
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Unidad de medida eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    unidadesMedida
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la unidad de medida actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la unidad de medida
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, conversion } = req.body;

    await unidadesMedida
        .updateOne({ _id: id }, { $set: { nombre, conversion } })
        .then((data) => res.status(200).json({ mensaje: "Datos de la unidad de medida actualizadas" }))
        .catch((error) => res.json({ message: error }));
});

// Obtener el numero de venta
router.get("/obtenerNoRegistro", async (req, res) => {
    const registroUnidad = await unidadesMedida.find().count();
    if (registroUnidad === 0) {
        res.status(200).json({ noUnidad: "UM-1" })
    } else {
        const ultimaUnidad = await unidadesMedida.findOne().sort({ _id: -1 });
        const tempFolio1 = ultimaUnidad.folio.split("-")
        const tempFolio = parseInt(tempFolio1[1]) + 1;
        res.status(200).json({ noUnidad: "UM-" + tempFolio.toString().padStart(1, 0) })
    }
});

module.exports = router;
