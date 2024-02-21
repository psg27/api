const express = require("express");
const router = express.Router();
const departamentos = require("../models/departamentos");

// Registro de departamentos
router.post("/registro", async (req, res) => {

    const departamentoRegistrar = departamentos(req.body);
    await departamentoRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso del departamento", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los departamentos
router.get("/listar", async (req, res) => {
    departamentos
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un departamento en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    departamentos
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un departamento
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    departamentos
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Departamento eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    departamentos
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del departamento actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del departamento
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;

    await departamentos
        .updateOne({ _id: id }, { $set: { nombre, email } })
        .then((data) => res.status(200).json({ mensaje: "Datos del departamento actualizados" }))
        .catch((error) => res.json({ message: error }));
});

// Obtener el numero de venta
router.get("/obtenerNoRegistro", async (req, res) => {
    const registroDepartamento = await departamentos.find().count();
    if (registroDepartamento === 0) {
        res.status(200).json({ noDepartamento: "DEPT-1" })
    } else {
        const ultimoDepartamento = await departamentos.findOne().sort({ _id: -1 });
        const tempFolio1 = ultimoDepartamento.folio.split("-")
        const tempFolio = parseInt(tempFolio1[1]) + 1;
        res.status(200).json({ noDepartamento: "DEPT-" + tempFolio.toString().padStart(1, 0) })
    }
});

module.exports = router;
