const express = require("express");
const router = express.Router();
const rutas = require("../models/configuracionRutas");

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
router.get("/listar", async (req, res) => {
    rutas
        .find()
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
        .then((data) => res.status(200).json({ mensaje: "Estado del rutas actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la orden de trabajo
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { folio, nombre, descripcion } = req.body;

    await rutas
        .updateOne({ _id: id }, { $set: { folio, nombre, descripcion } })
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
      const tempFolio = parseInt(ultimoRutas.folio) + 1;
      res.status(200).json({ folio: tempFolio });
    }
  });

module.exports = router;
