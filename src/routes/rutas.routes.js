const express = require("express");
const router = express.Router();
const rutas = require("../models/rutas");
const ordenesServicio = require("../models/ordenesServicio");

// Registro de rutas
router.post("/registro", async (req, res) => {

    const rutaRegistrar = rutas(req.body);
    await rutaRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso del ruta", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los ruta
router.get("/listarr", async (req, res) => {
    rutas
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los ruta
router.get("/listar", async (req, res) => {
    const { fecha } = req.query;
    rutas
        .find({ fecha })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los ruta
router.get("/listarPorCorreo", async (req, res) => {
    const { fecha, correoMensajero } = req.query;
    rutas
        .find({ fecha, correoMensajero })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un ruta en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    rutas
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un ruta
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    rutas
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Rutas eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    rutas
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la ruta actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la orden de trabajo
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { numeroRuta, ruta, nombreMensajero, vehiculoAsignado, numeroEconomico, horaInicio, observaciones } = req.body;

    await rutas
        .updateOne({ _id: id }, { $set: { numeroRuta, ruta, nombreMensajero, vehiculoAsignado, numeroEconomico, horaInicio, observaciones } })
        .then((data) => res.status(200).json({ mensaje: "Datos del rutas actualizados" }))
        .catch((error) => res.json({ message: error }));
});

// Obtener el numero de folio actual
router.get("/obtenerFolio", async (req, res) => {
    const registrorutas = await rutas.find().count();
    if (registrorutas === 0) {
        res.status(200).json({ folio: 1 });
    } else {
        const [ultimoRutas] = await rutas
            .find({})
            .sort({ folio: -1 })
            .limit(1);
        const tempFolio = parseInt(ultimoRutas.numeroRuta) + 1;
        res.status(200).json({ folio: tempFolio });
    }
});

router.get("/obtenerOrdenes/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      // Obtener el documento de la colección rutas
      const ruta = await rutas.findOne({ _id: id });
      // Verificar si se encontró la ruta y si tiene ordenesAsignadas
      if (ruta && ruta.ordenesAsignadas && ruta.ordenesAsignadas.length > 0) {
        // Obtener los documentos de la colección ordenesServicio utilizando los IDs de ordenesAsignadas
        try {
          const ordenServicioCursor = await ordenesServicio.find({ _id: { $in: ruta.ordenesAsignadas.map(id => id) } });
          res.json(ordenServicioCursor);
        } catch (error) {
          console.error("Error en la obtención de órdenes de servicio:", error);
          res.status(500).json({ error: "Error interno del servidor" });
          return;
        }
      } else {
        res.json({
          message: "No se encontró la ruta o no tiene ordenesAsignadas.",
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

module.exports = router;
