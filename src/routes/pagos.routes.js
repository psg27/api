const express = require("express");
const router = express.Router();
const pagos = require("../models/pagos");

// Registro de pagos
router.post("/registro", async (req, res) => {

    const pagoRegistrar = pagos(req.body);
    await pagoRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso del pago", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los pagos
router.get("/listar", async (req, res) => {
    pagos
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un pago en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    pagos
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un pago
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    pagos
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Pago eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    pagos
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del pago actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la orden de trabajo
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { correoCliente, nombreCliente, concepto, cantidad, realizaOperacion, formaPago } = req.body;

    await pagos
        .updateOne({ _id: id }, { $set: { correoCliente, nombreCliente, concepto, cantidad, realizaOperacion, formaPago } })
        .then((data) => res.status(200).json({ mensaje: "Datos de pago actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
