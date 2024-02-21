const express = require("express");
const router = express.Router();
const admin = require("../models/admin");

// Registro de administradores
router.post("/registro", async (req, res) => {
    const { email } = req.body;

    // Inicia validacion para no registrar admin con el mismo email
    const busqueda = await admin.findOne({ email });

    if (busqueda && busqueda.email === email) {
        return res.status(401).json({ mensaje: "Admin ya registrado" });
    } else {
        const adminRegistrar = admin(req.body);
        await adminRegistrar
            .save()
            .then((data) =>
                res.status(200).json(
                    {
                        mensaje: "Registro exitoso del admin", datos: data
                    }
                ))
            .catch((error) => res.json({ message: error }));
    }
});

// Obtener todos los admin
router.get("/listar", async (req, res) => {
    admin
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un admin en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    admin
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un admin
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    admin
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Admin eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    admin
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del admin actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del admin
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { idUsuario, nombre, email, password, estado } = req.body;

    // Inicia validacion para no registrar categoias con el mismo correo electronico
    const busqueda = await admin.findOne({ email });

    if (busqueda && busqueda.email === email && busqueda._id != id) {
        return res.status(401).json({ mensaje: "Admin ya registrado" });
    } else {
        await admin
            .updateOne({ _id: id }, { $set: { idUsuario, nombre, email, password, estado  } })
            .then((data) => res.status(200).json({ mensaje: "Datos del admin actualizados" }))
            .catch((error) => res.json({ message: error }));
    }
});

module.exports = router;
