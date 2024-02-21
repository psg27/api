const express = require("express");
const router = express.Router();
const ordenesTrabajo = require("../models/ordenesTrabajo");

// Registro de orden de trabajo
router.post("/registro", async (req, res) => {

    const ordenTrabajoRegistrar = ordenesTrabajo(req.body);
    await ordenTrabajoRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso de la orden de trabajo", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todas las ordenes de trabajo
router.get("/listar", async (req, res) => {
    ordenesTrabajo
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los doctores
router.get("/listarPorCorreoDoctor", async (req, res) => {
    const { correoDoctor } = req.query;

    ordenesTrabajo
        .find({ correoDoctor })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los doctores
router.get("/listarPorCorreoConsultorio", async (req, res) => {
    const { correoConsultorio } = req.query;

   ordenesTrabajo
        .find({ correoConsultorio })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una orden de trabajo en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    ordenesTrabajo
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una orden de trabajo
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    ordenesTrabajo
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Orden de trabajo eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    ordenesTrabajo
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la orden de trabajo actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la orden de trabajo
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { fecha, localidad, nombreDoctor, nombrePaciente, servicios, precioTotal, tipoDentadura, modeloSuperior, modeloInferior, mordidaCera, mordeidaSilicon, sAntagonista, llenadoCucharilla, otros, recibio, fechaEntrada } = req.body;

        await ordenesTrabajo
            .updateOne({ _id: id }, { $set: { fecha, localidad, nombreDoctor, nombrePaciente, servicios, precioTotal, tipoDentadura, modeloSuperior, modeloInferior, mordidaCera, mordeidaSilicon, sAntagonista, llenadoCucharilla, otros, recibio, fechaEntrada } })
            .then((data) => res.status(200).json({ mensaje: "Datos de la orden de trabajo actualizados" }))
            .catch((error) => res.json({ message: error }));
});

// Obtener el numero de venta
router.get("/obtenerNoRegistro", async (req, res) => {
    const registroOrden = await ordenesTrabajo.find().count();
    if (registroOrden === 0) {
        res.status(200).json({ noOrden: "OT-1" })
    } else {
        const ultimaOrden = await ordenesTrabajo.findOne().sort({ _id: -1 });
        const tempFolio1 = ultimaOrden.folio.split("-")
        const tempFolio = parseInt(tempFolio1[1]) + 1;
        res.status(200).json({ noOrden: "OT-" + tempFolio.toString().padStart(1, 0) })
    }
});

// Actualizar datos de la orden de trabajo
router.put("/actualizarPrioridad/:id", async (req, res) => {
    const { id } = req.params;
    const { prioridad } = req.body;

        await ordenesTrabajo
            .updateOne({ _id: id }, { $set: { prioridad } })
            .then((data) => res.status(200).json({ mensaje: "Datos de la orden de trabajo actualizados" }))
            .catch((error) => res.json({ message: error }));
});

router.get("/calcularHorasTranscurridas", async (req, res) => {
    try {
        // Obtener la fecha y hora actual en la zona horaria de la Ciudad de México
        const fechaActualCDMX = new Date();
        fechaActualCDMX.setHours(fechaActualCDMX.getHours()); // Ajuste manual para GMT-6 (zona horaria de la Ciudad de México)

        // Consulta utilizando aggregate y $addFields para incluir los demás campos y calcular las horas transcurridas
        const horasTranscurridas = await ordenesTrabajo.aggregate([
            {
                $addFields: {
                    horasTranscurridas: {
                        $trunc: {
                            $divide: [
                                {
                                    $subtract: [
                                        fechaActualCDMX,
                                        {
                                            $dateFromString: {
                                                dateString: "$fechaHora",
                                                format: "%Y-%m-%d %H:%M:%S",
                                                timezone: "America/Mexico_City" // Zona horaria de la Ciudad de México
                                            }
                                        }
                                    ]
                                },
                                1000 * 60 * 60 // Convertir de milisegundos a horas
                            ]
                        }
                    }
                }
            }
        ]);

        res.status(200).json({ horasTranscurridas });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
