const express = require("express");
const router = express.Router();
const almacen = require("../models/almacenProductosLimpieza");

// Registro de almacen
router.post("/registro", async (req, res) => {

    const almacenRegistrar = almacen(req.body);
    await almacenRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso del almacen", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los almacenes
router.get("/listar", async (req, res) => {
    almacen
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/listarPaginando", async (req, res) => {
    const { pagina, limite } = req.query;
    // console.log("Pagina ", pagina , " Limite ", limite)
  
    const skip = (pagina - 1) * limite;
  
    await almacen
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limite)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });
  
  router.get("/total", async (req, res) => {
    await almacen
      .find()
      .count()
      .sort({ _id: -1 })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

// Obtener un almacen en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    almacen
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un almacen
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    almacen
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Almacen eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    almacen
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del almacen actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del almacen
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { clave, claveAlterna, producto, minimo, maximo, existencia, entrada, salida, devolucion, existenciaReal } = req.body;

    await almacen
        .updateOne({ _id: id }, { $set: { clave, claveAlterna, producto, minimo, maximo, existencia, entrada, salida, devolucion, existenciaReal  } })
        .then((data) => res.status(200).json({ mensaje: "Datos del almacen actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
