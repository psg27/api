const express = require("express");
const router = express.Router();
const gastosMensajero = require("../models/mensajerosGastos");

// Registro de gastos mensajero
router.post("/registro", async (req, res) => {


    const gastosMensajeroRegistrar = gastosMensajero(req.body);
    await gastosMensajeroRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso de los gastos del mensajero", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los gastos mensajero
router.get("/listar", async (req, res) => {
    const { correoMensajero } = req.query;
    
    gastosMensajero
        .find({ correoMensajero })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un gasto del mensajro en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    gastosMensajero
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un gasto del mensajero en espcifico
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    gastosMensajero
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Gasto del mensajero eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    gastosMensajero
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del gasto del mensajero actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de los gastos del mensajero
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombreCliente, correoCliente, fecha, gastos, viaticos, total, diferencia } = req.body;

    await gastosMensajero
        .updateOne({ _id: id }, { $set: { nombreCliente, correoCliente, fecha, gastos, viaticos, total, diferencia } })
        .then((data) => res.status(200).json({ mensaje: "Datos de los gastos del mensajero actualizados" }))
        .catch((error) => res.json({ message: error }));
});

router.get("/listarSaldosMensajerosGral", async (req, res) => {
    gastosMensajero
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
