const express = require("express");
const router = express.Router();
const cuentasPagar = require("../models/cuentasPagar");

// Registro de cuentas por pagar
router.post("/registro", async (req, res) => {
    const cuentasRegistrar = cuentasPagar(req.body);
    await cuentasRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso de la cuenta por pagar", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos las cuentas por pagar
router.get("/listar", async (req, res) => {
    cuentasPagar
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una cuenta por pagar en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    cuentasPagar
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una cuenta por pagar
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    cuentasPagar
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Cuenta por pagar eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    cuentasPagar
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la cuenta por pagar actualizada" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la cuenta por pagar
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { concepto, monto, idProveedor, vencimiento, estado } = req.body;

        await cuentasPagar
            .updateOne({ _id: id }, { $set: { concepto, monto, idProveedor, vencimiento, estado } })
            .then((data) => res.status(200).json({ mensaje: "Datos de la cuenta por pagar actualizados" }))
            .catch((error) => res.json({ message: error }));
});

module.exports = router;
