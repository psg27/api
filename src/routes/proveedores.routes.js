const express = require("express");
const router = express.Router();
const proveedores = require("../models/proveedores");

// Registro de proveedores
router.post("/registro", async (req, res) => {

    const proveedorRegistrar = proveedores(req.body);
    await proveedorRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso del proveedor", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los proveedores
router.get("/listar", async (req, res) => {
    proveedores
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un proveedor en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    proveedores
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un proveedor
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    proveedores
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Proveedores eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    proveedores
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del proveedor actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la orden de trabajo
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    await proveedores
        .updateOne({ _id: id }, { $set: { nombre } })
        .then((data) => res.status(200).json({ mensaje: "Datos del proveedor actualizados" }))
        .catch((error) => res.json({ message: error }));
});

// Obtener el numero de venta
router.get("/obtenerNoRegistro", async (req, res) => {
    const registroProveedor = await proveedores.find().count();
    if (registroProveedor === 0) {
        res.status(200).json({ noProveedor: "PROV-1" })
    } else {
        const ultimoProveedor = await proveedores.findOne().sort({ _id: -1 });
        const tempFolio1 = ultimoProveedor.folio.split("-")
        const tempFolio = parseInt(tempFolio1[1]) + 1;
        res.status(200).json({ noProveedor: "PROV-" + tempFolio.toString().padStart(1, 0) })
    }
});

module.exports = router;
