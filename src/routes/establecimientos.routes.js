const express = require("express");
const router = express.Router();
const establecimientos = require("../models/establecimientos");

// Registro de establecimiento
router.post("/registro", async (req, res) => {

    const establecimientoRegistrar = establecimientos(req.body);
    await establecimientoRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso del establecimiento"
                }
            ))
        .catch((error) => res.json({ message: error }));
});

//Obtener ultimo registro
router.get("/listarUltimo", async (req, res) => {
    await establecimientos
        .find()
        .sort({ createdAt: -1})
        .limit(1)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos las establecimientos
router.get("/listar", async (req, res) => {
    establecimientos
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los doctores
router.get("/listarPorCorreo", async (req, res) => {
    const { email } = req.query;

    establecimientos
        .find({ email })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


// Obtener una establecimiento en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    establecimientos
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una establecimiento en especifico
router.get("/obtenerPorFolio/:folio", async (req, res) => {
    const { folio } = req.params;
    //console.log("buscando")
    establecimientos
        .findOne({folio})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una establecimiento en especifico
router.get("/obtenerPorCorreo/:email", async (req, res) => {
    const { email } = req.params;
    //console.log("buscando")
    establecimientos
        .findOne({email})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una establecimiento
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    establecimientos
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Establecimiento eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    establecimientos
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la establecimiento actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la establecimientos
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { razonSocial, estadoEstablecimiento, municipio, colonia, calle, numeroExterior, numeroInterior, codigoPostal, telefono, haceEsquina, email, observaciones, horario, alias, imagen} = req.body;

        await establecimientos
            .updateOne({ _id: id }, { $set: { razonSocial, estadoEstablecimiento, municipio, colonia, calle, numeroExterior, numeroInterior, codigoPostal, telefono, haceEsquina, email, observaciones, horario, alias, imagen } })
            .then((data) => res.status(200).json({ mensaje: "Datos del establecimiento actualizados" }))
            .catch((error) => res.json({ message: error }));
});

// Obtener el numero de venta
router.get("/obtenerNoRegistro", async (req, res) => {
    const registroConsultorios = await establecimientos.find().count();
    if (registroConsultorios === 0) {
        res.status(200).json({ noConsultorio: "CONS-1" })
    } else {
        const ultimoConsultorio = await establecimientos.findOne().sort({ _id: -1 });
        const tempFolio1 = ultimoConsultorio.folio.split("-")
        const tempFolio = parseInt(tempFolio1[1]) + 1;
        res.status(200).json({ noConsultorio: "CONS-" + tempFolio.toString().padStart(1, 0) })
    }
});

module.exports = router;
