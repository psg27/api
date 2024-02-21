const express = require("express");
const router = express.Router();
const gastosMensajero = require("../models/gastosMensajero");

// Registro de gastos mensajero
router.post("/registro", async (req, res) => {


    const gastosMensajeroRegistrar = gastosMensajero(req.body);
    await gastosMensajeroRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso de los gastos del mensajero", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los gastos mensajero
router.get("/listar", async (req, res) => {
    const { correoMensajero } = req.query;
    
    gastosMensajero
        .find({ correoMensajero })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


router.get("/listarGastosMensajerosGral", async (req, res) => {
    gastosMensajero
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un gasto del mensajro en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    gastosMensajero
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un gasto del mensajero en espcifico
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    gastosMensajero
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Gasto del mensajero eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    gastosMensajero
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del gasto del mensajero actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de los gastos del mensajero
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { fecha, concepto, saldo, cantidad, comentarios, imagen, estado } = req.body;

    await gastosMensajero
        .updateOne({ _id: id }, { $set: { fecha, concepto, saldo, cantidad, comentarios, imagen, estado } })
        .then((data) => res.status(200).json({ mensaje: "Datos de los gastos del mensajero actualizados" }))
        .catch((error) => res.json({ message: error }));
});

// Agregar ruta para obtener información agregada de gastos del mensajero
router.get("/informacion-agregada", async (req, res) => {
    try {
        const aggregationResult = await gastosMensajero.aggregate([
            {
                $group: {
                    _id: {
                        fecha: "$fecha",
                        correoMensajero: "$correoMensajero"
                    },
                    totalCantidad: { $sum: { $toDouble: "$cantidad" } }
                }
            },
            {
                $lookup: {
                    from: "mensajerosGastos",
                    let: { fecha: "$_id.fecha", correoMensajero: "$_id.correoMensajero" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$fecha", "$$fecha"] },
                                        { $eq: ["$correoCliente", "$$correoMensajero"] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                saldo: 1
                            }
                        }
                    ],
                    as: "saldoInfo"
                }
            },
            {
                $project: {
                    _id: 0,
                    fecha: "$_id.fecha",
                    correoMensajero: "$_id.correoMensajero",
                    totalCantidad: 1,
                    saldo: { $ifNull: [{ $arrayElemAt: ["$saldoInfo.saldo", 0] }, 0] }
                }
            },
            {
                $lookup: {
                    from: "mensajeros",
                    localField: "correoMensajero",
                    foreignField: "email",
                    as: "nombreInfo"
                }
            },
            {
                $unwind: "$nombreInfo"
            },
            {
                $project: {
                    fecha: 1,
                    correoMensajero: 1,
                    totalCantidad: 1,
                    saldo: 1,
                    nombre: "$nombreInfo.nombre"
                }
            }
        ]);

        res.status(200).json(aggregationResult);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la información agregada de gastos del mensajero", error });
    }
});



module.exports = router;
