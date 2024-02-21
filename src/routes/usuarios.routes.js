const express = require("express");
const router = express.Router();
const usuarios = require("../models/usuarios");
const nodeMailer = require("nodemailer");

router.post("/registro", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario ya existe
        const busqueda = await usuarios.findOne({ email });
        if (busqueda && busqueda.email === email) {
            return res.status(401).json({ mensaje: "Ya existe un usuario con este correo" });
        }

        // Crear y guardar el usuario en la base de datos
        const usuarioRegistrar = usuarios(req.body);
        const data = await usuarioRegistrar.save();

        // Enviar correo solo si el registro es exitoso
        const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "mxtvmasinfo@gmail.com",
                pass: "edqggruseowfqemc",
            },
        });

        const mailOptions = {
            from: "HERFRAN <mxtvmasinfo@gmail.com>",
            to: email,
            subject: "FUISTE DADO DE ALTA EN HERFRAN" + "\n" + "Para iniciar sesión en nuestro sistema" + "\n" + "Usa este mismo correo electrónico y la siguiente contraseña: " + password
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ mensaje: "Error al enviar el correo", error: error.message });
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));

            // Responder solo después de que el correo se haya enviado con éxito
            return res.status(200).json({ mensaje: "Registro exitoso del usuario", datos: data });
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al registrar el usuario", error: error.message });
    }
});

// Registro de usuarios
router.post("/registro2", async (req, res) => {
    const { email } = req.body;
    const busqueda = await usuarios.findOne({ email });
    if (busqueda && busqueda.email === email) {
        return res
            .status(401)
            .json({ mensaje: "Ya existe un usuario con este correo" });
    } else {
        const usuarioRegistrar = usuarios(req.body);
        await usuarioRegistrar
            .save()
            .then((data) =>
                res.status(200).json(
                    {
                        mensaje: "Registro exitoso del usuario", datos: data
                    }
                ))
            .catch((error) => res.json({ message: error }));
    }
});

// Obtener todos los usuarios
router.get("/listar", async (req, res) => {
    usuarios
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un usuario en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    usuarios
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un usuario
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    usuarios
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Usuario eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    usuarios
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del usuario actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la orden de trabajo
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, email, password, tipo, departamento } = req.body;

    await usuarios
        .updateOne({ _id: id }, { $set: { nombre, email, password, tipo, departamento } })
        .then((data) => res.status(200).json({ mensaje: "Datos del usuario actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
