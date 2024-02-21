const express = require("express");
const router = express.Router();
const facturacion = require("../models/facturacion");

// Registro de facturas
router.post("/registro", async (req, res) => {

    const facturacionRegistrar = facturacion(req.body);
    await facturacionRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso del factura", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

//Obtener ultimo registro
router.get("/listarUltimoFact", async (req, res) => {
    await facturacion
        .find()
        .sort({ createdAt: -1})
        .limit(1)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todas las facturas
router.get("/listar", async (req, res) => {
    facturacion
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una factura en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    facturacion
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una factura
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    facturacion
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Factura eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    facturacion
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la factura actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la factura
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { regimenFiscal, calle, numeroExterior, numeroInterior, codigoPostal, colonia, municipio, observaciones } = req.body;

    await facturacion
        .updateOne({ _id: id }, { $set: { regimenFiscal, calle, numeroExterior, numeroInterior, codigoPostal, colonia, municipio, observaciones } })
        .then((data) => res.status(200).json({ mensaje: "Datos de la factura actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
