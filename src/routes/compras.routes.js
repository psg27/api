const express = require("express");
const router = express.Router();
const compras = require("../models/compras");

// Registro de compras
router.post("/registro", async (req, res) => {
    const comprasRegistrar = compras(req.body);
    await comprasRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso de la compra", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos las compras
router.get("/listar", async (req, res) => {
    compras
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una compra en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    compras
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una compra
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    compras
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Compra eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    compras
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la compra actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la compra
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { status, fecha, nombreSolicitante, departamento, materiales, observaciones } = req.body;

    await compras
        .updateOne({ _id: id }, { $set: { status, fecha, nombreSolicitante, departamento, materiales, observaciones } })
        .then((data) => res.status(200).json({ mensaje: "Datos de la compra actualizados" }))
        .catch((error) => res.json({ message: error }));
});

// Obtener el numero de venta
router.get("/obtenerNoRegistro", async (req, res) => {
    const registroCompra = await compras.find().count();
    if (registroCompra === 0) {
        res.status(200).json({ noCompra: "OC-1" })
    } else {
        const ultimaCompra = await compras.findOne().sort({ _id: -1 });
        const tempFolio1 = ultimaCompra.folio.split("-")
        const tempFolio = parseInt(tempFolio1[1]) + 1;
        res.status(200).json({ noCompra: "OC-" + tempFolio.toString().padStart(1, 0) })
    }
});

module.exports = router;
