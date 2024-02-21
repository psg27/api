const express = require("express");
const router = express.Router();
const saldosCliente = require("../models/saldosCliente");

// Registro de los precios de la orden
router.post("/registro", async (req, res) => {

        const saldosClienteRegistrar = saldosCliente(req.body);
        await saldosClienteRegistrar
            .save()
            .then((data) =>
                res.status(200).json(
                    {
                        mensaje: "Registro exitoso de los saldos del cliente", datos: data
                    }
                ))
            .catch((error) => res.json({ message: error }));
});

// Obtener todos los precios de la orden
router.get("/listar", async (req, res) => {
    saldosCliente
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un precioOrden en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    saldosCliente
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un precioOrden
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    saldosCliente
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Precio orden eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    saldosCliente
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del precio de la orden actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del precioOrden
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombreCliente, correoCliente, saldo } = req.body;

        await saldosCliente
            .updateOne({ _id: id }, { $set: { nombreCliente, correoCliente, saldo } })
            .then((data) => res.status(200).json({ mensaje: "Datos de los precios de la orden actualizados" }))
            .catch((error) => res.json({ message: error }));
});

// Actualizar datos del precioOrden por correoCliente
router.put("/actualizarPorCorreo/:correoCliente", async (req, res) => {
    const { correoCliente } = req.params;
    const { saldo } = req.body;
    saldosCliente
        .updateOne({ correoCliente: correoCliente }, { $set: { saldo } })
        .then((data) => res.status(200).json({ mensaje: "Saldo actualizado" }))
        .catch((error) => res.json({ message: error }));
});


module.exports = router;
