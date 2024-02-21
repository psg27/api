const express = require("express");
const router = express.Router();
const entregas = require("../models/entregas");

// Registro de entregas
router.post("/registro", async (req, res) => {

    const entregaRegistrar = entregas(req.body);
    await entregaRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso de la entrega", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos las entregas
router.get("/listar", async (req, res) => {
    entregas
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los doctores
router.get("/listarPorCorreoMensajero", async (req, res) => {
    const { correoMensajero } = req.query;

    entregas
        .find({ correoMensajero })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una entrega en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    entregas
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una entrega
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    entregas
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Entrega eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    entregas
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la entrega actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la entrega
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { folio, mensajero, correoMensajero, fechayHoraEntrega, ordenTrabajo, motivoEntrega, comentarios, recibio, ubicacion, estado } = req.body;

    await entregas
        .updateOne({ _id: id }, { $set: { folio, mensajero, correoMensajero, fechayHoraEntrega, ordenTrabajo, motivoEntrega, comentarios, recibio, ubicacion, estado } })
        .then((data) => res.status(200).json({ mensaje: "Datos de la entrega actualizados" }))
        .catch((error) => res.json({ message: error }));
});

// Obtener el numero de venta
router.get("/obtenerNoRegistro", async (req, res) => {
    const registroEntrega = await entregas.find().count();
    if (registroEntrega === 0) {
        res.status(200).json({ noEntrega: "ENT-1" })
    } else {
        const ultimaEntrega = await entregas.findOne().sort({ _id: -1 });
        const tempFolio1 = ultimaEntrega.folio.split("-")
        const tempFolio = parseInt(tempFolio1[1]) + 1;
        res.status(200).json({ noEntrega: "ENT-" + tempFolio.toString().padStart(1, 0) })
    }
});

module.exports = router;
