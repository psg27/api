const express = require("express");
const router = express.Router();
const preciosOrden = require("../models/preciosOrden");

// Registro de los precios de la orden
router.post("/registro", async (req, res) => {

        const preciosOrdenRegistrar = preciosOrden(req.body);
        await preciosOrdenRegistrar
            .save()
            .then((data) =>
                res.status(200).json(
                    {
                        mensaje: "Registro exitoso de los precios de la orden", datos: data
                    }
                ))
            .catch((error) => res.json({ message: error }));
});

// Obtener todos los precios de la orden
router.get("/listar", async (req, res) => {
    preciosOrden
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los doctores
router.get("/listarPorCorreoCliente", async (req, res) => {
    const { ordenServicio } = req.query;

    preciosOrden
        .find({ ordenServicio })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un precioOrden en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    preciosOrden
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un precioOrden
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    preciosOrden
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Precio orden eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    preciosOrden
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del precio de la orden actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del precioOrden
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { ordenServicio, tipo, concepto, cantidad, correoRegistro } = req.body;

        await preciosOrden
            .updateOne({ _id: id }, { $set: { ordenServicio, tipo, concepto, cantidad, correoRegistro  } })
            .then((data) => res.status(200).json({ mensaje: "Datos de los precios de la orden actualizados" }))
            .catch((error) => res.json({ message: error }));
});

module.exports = router;
