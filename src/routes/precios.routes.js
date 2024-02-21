const express = require("express");
const router = express.Router();
const precios = require("../models/precios");

// Registro de precios
router.post("/registro", async (req, res) => {

        const preciosRegistrar = precios(req.body);
        await preciosRegistrar
            .save()
            .then((data) =>
                res.status(200).json(
                    {
                        mensaje: "Registro exitoso del precio", datos: data
                    }
                ))
            .catch((error) => res.json({ message: error }));
});

// Obtener todos los precios
router.get("/listar", async (req, res) => {
    precios
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un precio en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    precios
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un precios
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    precios
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Precio eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    precios
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del precio actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del precios
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { clasificacion, tipoServicios, materiales, piezas, servicios, precio, sistemaColorPrincipal, otrosColores } = req.body;

        await precios
            .updateOne({ _id: id }, { $set: { clasificacion, tipoServicios, materiales, piezas, servicios, precio, sistemaColorPrincipal, otrosColores } })
            .then((data) => res.status(200).json({ mensaje: "Datos del precio actualizados" }))
            .catch((error) => res.json({ message: error }));
});

module.exports = router;
