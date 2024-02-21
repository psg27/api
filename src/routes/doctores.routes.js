const express = require("express");
const router = express.Router();
const doctores = require("../models/doctores");

// Registro de doctores
router.post("/registro", async (req, res) => {
    const { email } = req.body;

    // Inicia validacion para no registrar doctor con el mismo email
    const busqueda = await doctores.findOne({ email });

    if (busqueda && busqueda.email === email) {
        return res.status(401).json({ mensaje: "Doctor ya registrado" });
    } else {
        const doctorRegistrar = doctores(req.body);
        await doctorRegistrar
            .save()
            .then((data) =>
                res.status(200).json(
                    {
                        mensaje: "Registro exitoso del doctor", datos: data
                    }
                ))
            .catch((error) => res.json({ message: error }));
    }
});

//Obtener ultimo registro
router.get("/listarUltimoDoc", async (req, res) => {
    await doctores
        .find()
        .sort({ createdAt: -1 })
        .limit(1)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


// Obtener todos los doctores
router.get("/listar", async (req, res) => {
    doctores
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los doctores
router.get("/listarPorCorreo", async (req, res) => {
    const { correoConsultorio } = req.query;

    doctores
        .find({ correoConsultorio })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los doctores
router.get("/listarPorCorreoDoctor", async (req, res) => {
    const { email } = req.query;

    doctores
        .find({ email })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un doctor en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    doctores
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un doctor en especifico
router.get("/obtenerPorCorreo/:email", async (req, res) => {
    const { email } = req.params;
    //console.log("buscando")
    doctores
        .findOne({ email })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un doctor en especifico
router.get("/obtenerPorRFC/:rfc", async (req, res) => {
    const { rfc } = req.params;
    //console.log("buscando")
    doctores
        .findOne({ rfc })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un doctor
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    doctores
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Doctor eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    doctores
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del doctor actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del doctor
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { telefonoCelular, email, observaciones, consultorio, nombreConsultorio, correoConsultorio } = req.body;

    // Inicia validacion para no registrar categoias con el mismo correo electronico
    const busqueda = await doctores.findOne({ email });

    if (busqueda && busqueda.email === email && busqueda._id != id) {
        return res.status(401).json({ mensaje: "Doctor ya registrado" });
    } else {
        await doctores
            .updateOne({ _id: id }, { $set: { telefonoCelular, email, observaciones, consultorio, nombreConsultorio, correoConsultorio } })
            .then((data) => res.status(200).json({ mensaje: "Datos del doctor actualizados" }))
            .catch((error) => res.json({ message: error }));
    }
});

// Obtener el numero de venta
router.get("/obtenerNoRegistro", async (req, res) => {
    const registroDoctores = await doctores.find().count();
    if (registroDoctores === 0) {
        res.status(200).json({ noDoctor: "DR-1" })
    } else {
        const ultimoDoctor = await doctores.findOne().sort({ _id: -1 });
        const tempFolio1 = ultimoDoctor.folio.split("-")
        const tempFolio = parseInt(tempFolio1[1]) + 1;
        res.status(200).json({ noDoctor: "DR-" + tempFolio.toString().padStart(1, 0) })
    }
});

module.exports = router;
