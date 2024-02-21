const express = require("express");
const router = express.Router();
const almacen = require("../models/movimientosAlmacenMP");

// Registro de almacen
router.post("/registro", async (req, res) => {

    const almacenRegistrar = almacen(req.body);
    await almacenRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso del almacen", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los almacenes
router.get("/listar", async (req, res) => {
    const { idArticuloAMP } = req.query;
    almacen
        .find({ idArticuloAMP })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los almacenes
router.get("/listarFiltroFecha", async (req, res) => {
    const { idArticuloAMP, inicio, fin } = req.query;
    almacen
        .find({ idArticuloAMP, createdAt: { $gte: new Date(inicio+'T00:00:00.000Z'), $lte: new Date(fin+'T23:59:59.999Z') } })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un almacen en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    almacen
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un almacen
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    almacen
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Almacen eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    almacen
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del almacen actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del almacen
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { clave, producto, inicial, minimo, maximo, entrada, salida, fisico, pedido, pedidoNecesidad } = req.body;

    await almacen
        .updateOne({ _id: id }, { $set: { clave, producto, inicial, minimo, maximo, entrada, salida, fisico, pedido, pedidoNecesidad } })
        .then((data) => res.status(200).json({ mensaje: "Datos del almacen actualizados" }))
        .catch((error) => res.json({ message: error }));
});

// Obtener el numero de venta
router.get("/obtenerNoRegistro", async (req, res) => {
    const registroAlmacen = await pedidoVenta.find().count();
    if (registroAlmacen === 0) {
        res.status(200).json({ noAlmacen: "AMP-1" })
    } else {
        const ultimoAlmacen = await almacen.findOne().sort({ _id: -1 });
        const tempFolio1 = ultimoAlmacen.clave.split("-")
        const tempFolio = parseInt(tempFolio1[1]) + 1;
        res.status(200).json({ noAlmacen: "AMP-" + tempFolio.toString().padStart(1, 0) })
    }
});

module.exports = router;
