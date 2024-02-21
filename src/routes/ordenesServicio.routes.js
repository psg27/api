const express = require("express");
const router = express.Router();
const ordenesServicio = require("../models/ordenesServicio");
const establecimientos = require("../models/establecimientos");
const doctores = require("../models/doctores");

// Registro de orden de servicio
router.post("/registro", async (req, res) => {

    const ordenServicioRegistrar = ordenesServicio(req.body);
    await ordenServicioRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso de la orden de servicio", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todas las ordenes de servicio
router.get("/listar", async (req, res) => {
    ordenesServicio
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/listarPaginando", async (req, res) => {
    const { pagina, limite } = req.query;
    // console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await ordenesServicio
        .find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/total", async (req, res) => {
    await ordenesServicio
        .find()
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los doctores
router.get("/listarPorCorreoDoctor", async (req, res) => {
    const { correoDoctor } = req.query;

    ordenesServicio
        .find({ correoDoctor })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los doctores
router.get("/listarPorCorreoConsultorio", async (req, res) => {
    const { correoConsultorio } = req.query;

    ordenesServicio
        .find({ correoConsultorio })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/listarPorCorreoMensajero", async (req, res) => {
    const { correoMensajero } = req.query;

    ordenesServicio
        .find({ correoMensajero })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una orden de servicio en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    ordenesServicio
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una orden de servicio
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    ordenesServicio
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Orden de servicio eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado, fechaRealProgramacion } = req.body;
    ordenesServicio
        .updateOne({ _id: id }, { $set: { estado, fechaRealProgramacion } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la orden de servicio actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitarPorFolio/:folio", async (req, res) => {
    const { folio } = req.params;
    const { estado } = req.body;
    ordenesServicio
        .updateOne({ folio: folio }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la orden de servicio actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la orden de servicio
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { fecha, localidad, nombreDoctor, nombrePaciente, servicios, precioTotal, tipoDentadura, modeloSuperior, modeloInferior, mordidaCera, mordeidaSilicon, sAntagonista, llenadoCucharilla, otros, recibio, fechaEntrada } = req.body;

    await ordenesServicio
        .updateOne({ _id: id }, { $set: { fecha, localidad, nombreDoctor, nombrePaciente, servicios, precioTotal, tipoDentadura, modeloSuperior, modeloInferior, mordidaCera, mordeidaSilicon, sAntagonista, llenadoCucharilla, otros, recibio, fechaEntrada } })
        .then((data) => res.status(200).json({ mensaje: "Datos de la orden de servicio actualizados" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la orden de servicio
router.put("/actualizarTotal/:id", async (req, res) => {
    const { id } = req.params;
    const { precioTotal } = req.body;

    await ordenesServicio
        .updateOne({ _id: id }, { $set: { precioTotal } })
        .then((data) => res.status(200).json({ mensaje: "Total de la orden actualizados" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la orden de servicio
router.put("/asignarMensajero/:id", async (req, res) => {
    const { id } = req.params;
    const { mensajero, correoMensajero, fechaProgramadaRecoleccion, fechaRealProgramacion, estado } = req.body;

    await ordenesServicio
        .updateOne({ _id: id }, { $set: { mensajero, correoMensajero, fechaProgramadaRecoleccion, fechaRealProgramacion, estado } })
        .then((data) => res.status(200).json({ mensaje: "Mensajero asignado a la orden de servicio" }))
        .catch((error) => res.json({ message: error }));
});

// Obtener el numero de venta
router.get("/obtenerNoRegistro", async (req, res) => {
    const registroOrden = await ordenesServicio.find().count();
    if (registroOrden === 0) {
        res.status(200).json({ noOrden: "OS-1" })
    } else {
        const ultimaOrden = await ordenesServicio.findOne().sort({ _id: -1 });
        const tempFolio1 = ultimaOrden.folio.split("-")
        const tempFolio = parseInt(tempFolio1[1]) + 1;
        res.status(200).json({ noOrden: "OS-" + tempFolio.toString().padStart(1, 0) })
    }
});

// Obtener todas las fechas y su frecuencia de aparición
router.get("/fechasConFrecuencia", async (req, res) => {
    try {
        const fechasConFrecuencia = await ordenesServicio.aggregate([
            {
                $group: {
                    _id: "$fecha",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    fecha: "$_id",
                    frecuencia: "$count"
                }
            },
            {
                $sort: {
                    frecuencia: -1 // Ordenar de mayor a menor frecuencia
                }
            }
        ]);

        res.json(fechasConFrecuencia);
    } catch (error) {
        res.json({ message: error });
    }
});

// Obtener todas las fechas y su frecuencia de aparición
router.get("/direccionConsultorioFrecuencia", async (req, res) => {
    try {
        const direccionConFrecuencia = await ordenesServicio.aggregate([
            {
                $group: {
                    _id: { $ifNull: ["$direccionConsultorio", "No especificado"] },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    direccion: "$_id",
                    frecuencia: "$count"
                }
            },
            {
                $sort: {
                    frecuencia: -1 // Ordenar de mayor a menor frecuencia
                }
            }
        ]);

        res.json(direccionConFrecuencia);
    } catch (error) {
        res.json({ message: error });
    }
});

// Cambiar estado
router.put("/recibirMaterial/:id", async (req, res) => {
    const { id } = req.params;
    const { estado, cantidadMaterialEntregado } = req.body;
    ordenesServicio
        .updateOne({ _id: id }, { $set: { estado, cantidadMaterialEntregado } })
        .then((data) => res.status(200).json({ mensaje: "Material recibido registrado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/actualizaMaterialRecepcion/:id", async (req, res) => {
    const { id } = req.params;
    const { recibio, servicios, imagen1, observacionesImagen1, imagen2, observacionesImagen2, imagen3, observacionesImagen3, imagen4, observacionesImagen4, imagen5, observacionesImagen5, imagen6, observacionesImagen6, otros, estado } = req.body;
    ordenesServicio
        .updateOne({ _id: id }, { $set: { recibio, servicios, imagen1, observacionesImagen1, imagen2, observacionesImagen2, imagen3, observacionesImagen3, imagen4, observacionesImagen4, imagen5, observacionesImagen5, imagen6, observacionesImagen6, otros, estado } })
        .then((data) => res.status(200).json({ mensaje: "Actualizacion de material registrado" }))
        .catch((error) => res.json({ message: error }));
});

router.get("/ordenesYSaldos", async (req, res) => {
    try {
        const estadisticas = await ordenesServicio.aggregate([
            {
                $lookup: {
                    from: "saldosCliente",
                    localField: "cargoOrden",
                    foreignField: "correoCliente",
                    as: "saldoClienteInfo"
                }
            },
            {
                $unwind: {
                    path: "$saldoClienteInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "establecimientos",
                    localField: "cargoOrden",
                    foreignField: "email",
                    as: "establecimientoInfo"
                }
            },
            {
                $unwind: {
                    path: "$establecimientoInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "doctores",
                    localField: "cargoOrden",
                    foreignField: "email",
                    as: "doctorInfo"
                }
            },
            {
                $unwind: {
                    path: "$doctorInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    cargoOrden: 1,
                    precioTotal: 1,
                    saldo: { $ifNull: ["$saldoClienteInfo.saldo", null] },
                    razonSocial: {
                        $ifNull: [
                            "$establecimientoInfo.razonSocial",
                            { $concat: ["$doctorInfo.nombre", " ", "$doctorInfo.apellidoPaterno", " ", "$doctorInfo.apellidoMaterno"] }
                        ]
                    },
                    count: 1
                }
            },
            {
                $group: {
                    _id: "$cargoOrden",
                    totalPrecio: { $sum: { $toDouble: "$precioTotal" } },
                    saldo: { $first: { $ifNull: [{ $toDouble: "$saldo" }, null] } },
                    razonSocial: { $first: "$razonSocial" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id": 1 // 1 para orden ascendente, -1 para orden descendente
                }
            },
        ]);

        res.status(200).json(estadisticas);
    } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/filtrarSaldosPeriodo", async (req, res) => {
    try {
        const { date1, date2 } = req.query;
        console.log(date1, date2);

        const estadisticas = await ordenesServicio.aggregate([
            {
                $match: {
                    fecha: {
                        $gte: date1,
                        $lte: date2
                    }
                }
            },
            {
                $group: {
                    _id: {
                        cargoOrden: "$cargoOrden",
                        correoCliente: "$correoCliente"
                    },
                    totalPrecio: { $sum: { $toDouble: "$precioTotal" } },
                    totalRegistros: { $sum: 1 } // Contador de registros por grupo
                }
            },
            {
                $lookup: {
                    from: "pagos",
                    let: {
                        cargoOrden: "$_id.cargoOrden",
                        correoCliente: "$_id.correoCliente"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$cargoOrden", "$$correoCliente"] },
                                        { $eq: ["$correoCliente", "$$cargoOrden"] },
                                        { $gte: ["$fecha", date1] },
                                        { $lte: ["$fecha", date2] }
                                    ]
                                }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                totalCantidad: { $sum: { $toDouble: "$cantidad" } }
                            }
                        }
                    ],
                    as: "pagosInfo"
                }
            },
            {
                $unwind: {
                    path: "$pagosInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "preciosOrden",
                    let: {
                        cargoOrden: "$_id.cargoOrden"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$ordenServicio", "$$cargoOrden"] },
                                        { $in: ["$tipo", ["cargo", "descuento"]] },
                                        { $gte: ["$fecha", date1] },
                                        { $lte: ["$fecha", date2] }
                                    ]
                                }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                totalCantidadDescuento: {
                                    $sum: {
                                        $cond: { if: { $eq: ["$tipo", "descuento"] }, then: { $toDouble: "$cantidad" }, else: 0 }
                                    }
                                },
                                totalCantidadCargo: {
                                    $sum: {
                                        $cond: { if: { $eq: ["$tipo", "cargo"] }, then: { $toDouble: "$cantidad" }, else: 0 }
                                    }
                                }
                            }
                        }
                    ],
                    as: "preciosOrdenInfo"
                }
            },
            {
                $unwind: {
                    path: "$preciosOrdenInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    totalPrecio: 1,
                    totalCantidadPagos: { $ifNull: ["$pagosInfo.totalCantidad", 0] },
                    totalCantidadDescuento: { $ifNull: ["$preciosOrdenInfo.totalCantidadDescuento", 0] },
                    totalCantidadCargo: { $ifNull: ["$preciosOrdenInfo.totalCantidadCargo", 0] },
                    totalRegistros: 1 // Mostrar el contador de registros
                }
            },
            {
                $sort: {
                    totalPrecio: -1
                }
            }
        ]);

        res.status(200).json(estadisticas);
    } catch (error) {
        console.error("Error al obtener las estadísticas de órdenes:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Definir la ruta y el controlador
router.get("/filtrarSaldosGeneral", async (req, res) => {
    try {
        const estadisticas = await ordenesServicio.aggregate([
            {
                $lookup: {
                    from: "saldosCliente",
                    localField: "cargoOrden",
                    foreignField: "correoCliente",
                    as: "saldoClienteInfo"
                }
            },
            {
                $unwind: {
                    path: "$saldoClienteInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "establecimientos",
                    localField: "cargoOrden",
                    foreignField: "email",
                    as: "establecimientoInfo"
                }
            },
            {
                $unwind: {
                    path: "$establecimientoInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "doctores",
                    localField: "cargoOrden",
                    foreignField: "email",
                    as: "doctorInfo"
                }
            },
            {
                $unwind: {
                    path: "$doctorInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    cargoOrden: 1,
                    precioTotal: 1,
                    saldo: { $ifNull: ["$saldoClienteInfo.saldo", null] },
                    razonSocial: {
                        $ifNull: [
                            "$establecimientoInfo.razonSocial",
                            { $concat: ["$doctorInfo.nombre", " ", "$doctorInfo.apellidoPaterno", " ", "$doctorInfo.apellidoMaterno"] }
                        ]
                    },
                    count: 1
                }
            },
            {
                $group: {
                    _id: "$cargoOrden",
                    totalPrecio: { $sum: { $toDouble: "$precioTotal" } },
                    saldo: { $first: { $ifNull: [{ $toDouble: "$saldo" }, null] } },
                    razonSocial: { $first: "$razonSocial" },
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "preciosOrden",
                    localField: "_id",
                    foreignField: "ordenServicio",
                    as: "preciosOrdenInfo"
                }
            },
            {
                $unwind: {
                    path: "$preciosOrdenInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    "preciosOrdenInfo.tipo": { $in: ["cargo", "descuento"] } // Filtra por "cargo" y "descuento"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    totalPrecio: { $first: "$totalPrecio" },
                    saldo: { $first: "$saldo" },
                    razonSocial: { $first: "$razonSocial" },
                    count: { $first: "$count" },
                    totalCantidadCargo: {
                        $sum: {
                            $cond: {
                                if: { $eq: ["$preciosOrdenInfo.tipo", "cargo"] },
                                then: { $toInt: "$preciosOrdenInfo.cantidad" },
                                else: 0
                            }
                        }
                    },
                    totalCantidadDescuento: {
                        $sum: {
                            $cond: {
                                if: { $eq: ["$preciosOrdenInfo.tipo", "descuento"] },
                                then: { $toInt: "$preciosOrdenInfo.cantidad" },
                                else: 0
                            }
                        }
                    }
                }
            }
        ]);

        res.status(200).json(estadisticas);
    } catch (error) {
        console.error("Error al obtener las estadísticas de órdenes:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;
