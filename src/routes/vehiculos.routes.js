const express = require("express");
const router = express.Router();
const vehiculos = require("../models/vehiculos");

// Registro de vehiculos
router.post("/registro", async (req, res) => {

        const vehiculosRegistrar = vehiculos(req.body);
        await vehiculosRegistrar
            .save()
            .then((data) =>
                res.status(200).json(
                    {
                        mensaje: "Registro exitoso del vehiculo", datos: data
                    }
                ))
            .catch((error) => res.json({ message: error }));
});

// Obtener todos los vehiculos
router.get("/listar", async (req, res) => {
    vehiculos
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un vehiculo en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    vehiculos
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un vehiculo
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    vehiculos
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "vehiculo eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    vehiculos
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del vehiculo actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del vehiculo
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { conductor, modelo, placa, numEconomico, color, kilometrajeActual, kilometrajeRecorrido, imagen } = req.body;

        await vehiculos
            .updateOne({ _id: id }, { $set: { conductor, modelo, placa, numEconomico, color, kilometrajeActual, kilometrajeRecorrido, imagen } })
            .then((data) => res.status(200).json({ mensaje: "Datos del vehiculo actualizados" }))
            .catch((error) => res.json({ message: error }));
});

// Actualizar kilometraje del vehiculo
router.put("/actualizarKilometraje/:id", async (req, res) => {
    const { id } = req.params;
    const { kilometrajeActual, kilometrajeRecorrido } = req.body;

        await vehiculos
            .updateOne({ _id: id }, { $set: { kilometrajeActual, kilometrajeRecorrido } })
            .then((data) => res.status(200).json({ mensaje: "Datos del vehiculo actualizados" }))
            .catch((error) => res.json({ message: error }));
});

module.exports = router;
