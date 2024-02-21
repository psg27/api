const express = require("express");
const router = express.Router();
const servicios = require("../models/servicios");

// Registro de servicios
router.post("/registro", async (req, res) => {

    const servicioRegistrar = servicios(req.body);
    await servicioRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso del servicio", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los servicios
router.get("/listar", async (req, res) => {
    servicios
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/listarODT", async (req, res) => {
    try {
        // Filtra para obtener solo los documentos donde el campo ODT existe
        const data = await servicios.find({ ODT: { $exists: true } }).sort({ _id: -1 });
        res.json(data);
    } catch (error) {
        // Manejo de errores con más detalle
        console.error(error); // Para diagnóstico
        res.status(500).json({ message: "Error al obtener los servicios" });
    }
});


// Obtener todas las ordenes de servicio
router.get("/listarFolio", async (req, res) => {
    const { folio } = req.query;
    servicios
        .find({ folio })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todas las ordenes de servicio
router.get("/listarCorreo", async (req, res) => {
    const { email } = req.query;
    servicios
        .find({ email })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todas las ordenes de servicio
router.get("/listarDepartamento", async (req, res) => {
    const { departamento } = req.query;
    servicios
        .find({ departamento })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todas las ordenes de servicio
router.get("/listarFolioDepartamento", async (req, res) => {
    const { folio, departamento } = req.query;
    servicios
        .find({ folio, departamento })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un servicio en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    servicios
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un servicio
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    servicios
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Servicio eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Borrar un servicio
router.delete("/eliminarPorFolio/:folio", async (req, res) => {
    const { folio } = req.params;
    console.log(folio)
    servicios
        .deleteMany({ folio: folio })
        .then((data) => res.status(200).json({ mensaje: "Servicios eliminados" }))
        .catch((error) => res.json({ message: error }));
});


// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    servicios
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del servicio actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la orden de trabajo
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { clasificacion, material, pieza, precio, descripcionAdicional, sistemaColor, tonoInferior, tonoMedio, tonoSuperior, imagen1, imagen2, imagen3, imagen4, imagen5 } = req.body;

    await servicios
        .updateOne({ _id: id }, { $set: { clasificacion, material, pieza, precio, descripcionAdicional, sistemaColor, tonoInferior, tonoMedio, tonoSuperior, imagen1, imagen2, imagen3, imagen4, imagen5 } })
        .then((data) => res.status(200).json({ mensaje: "Datos del servicio actualizados" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la orden de trabajo
router.put("/actualizarDepartamento/:id", async (req, res) => {
    const { id } = req.params;
    const { folioDepartamento, departamento, email, estado, prioridad, ODT } = req.body;

    await servicios
        .updateOne({ _id: id }, { $set: { folioDepartamento, departamento, email, estado, prioridad, ODT } })
        .then((data) => res.status(200).json({ mensaje: "Departamento asignado al servicio servicio actualizado" }))
        .catch((error) => res.json({ message: error }));
});
/*
// Obtener el numero de venta
router.get("/obtenerNoODT", async (req, res) => {
    const registroServicio = await servicios.find().count();
    if (registroServicio === 0) {
        res.status(200).json({ noOrden: "ODT-1" })
    } else {
        const ultimaOrden = await servicios.findOne().sort({ _id: -1 });
        const tempFolio1 = ultimaOrden.folio.split("-")
        const tempFolio = parseInt(tempFolio1[1]) + 1;
        res.status(200).json({ noOrden: "ODT-" + tempFolio.toString().padStart(1, 0) })
    }
});*/

module.exports = router;
