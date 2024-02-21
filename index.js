const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

require("./src/database");

const file = path.join(__dirname, "favicon.ico");

const notFound = require("./src/middleware/notFound");
const handleErrors = require("./src/middleware/handleErrors");
const { verifyToken } = require("./src/middleware/verifyToken");

// Configuración del servidor
const app = express();

Sentry.init({
  dsn: "https://34cda94143a14ff3938078498a0bc8e4@o1301469.ingest.sentry.io/6538433",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// Configuracion para desplegar
const PORT = process.env.PORT || 8080;

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, responseType, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.get("/", (_req, res) => {
  return res.status(200).json({
    mensaje: "API del proyecto de laboratorio, Propiedad de ISOTECH MÉXICO",
  });
});

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(favicon(file));
app.use(cors());


// Routes
app.use(require("./src/routes/login.routes"));
app.use("/usuarios/", require("./src/routes/usuarios.routes"));
app.use("/admin/", require("./src/routes/admin.routes"));
app.use("/cuentasPagar/", require("./src/routes/cuentasPagar.routes"));
app.use("/doctores/", require("./src/routes/doctores.routes"));
app.use("/entregas/", require("./src/routes/entregas.routes"));
app.use("/establecimientos/", require("./src/routes/establecimientos.routes"));
app.use("/inventario/", require("./src/routes/inventario.routes"));
app.use("/mensajeros/", require("./src/routes/mensajeros.routes"));
app.use("/ordenesServicio/", require("./src/routes/ordenesServicio.routes"));
app.use("/ordenesTrabajo/", require("./src/routes/ordenesTrabajo.routes"));
app.use("/pagos/", require("./src/routes/pagos.routes"));
app.use("/proveedores/", require("./src/routes/proveedores.routes"));
app.use("/reportes/", require("./src/routes/reportes.routes"));
app.use("/rutas/", require("./src/routes/rutas.routes"));
app.use("/configuracionRutas/", require("./src/routes/configuracionRutas.routes"));
app.use("/servicios/", require("./src/routes/servicios.routes"));
app.use("/visitas/", require("./src/routes/visitas.routes"));
app.use("/almacenProductosLimpieza/", require("./src/routes/almacenProductosLimpieza.routes"));
app.use("/almacenMateriasPrimas/", require("./src/routes/almacenMateriasPrimas.routes"));
app.use("/movimientosAlmacenPL/", require("./src/routes/movimientosAlmacenPL.routes"));
app.use("/movimientosAlmacenMP/", require("./src/routes/movimientosAlmacenMP.routes"));
app.use("/facturacion/", require("./src/routes/facturacion.routes"));
app.use("/precios/", require("./src/routes/precios.routes"));
app.use("/serviciosDentales/", require("./src/routes/serviciosDentales.routes"));
app.use("/colorimetria/", require("./src/routes/colorimetria.routes"));
app.use("/compras/", require("./src/routes/compras.routes"));
app.use("/vehiculos/", require("./src/routes/vehiculos.routes"));
app.use("/departamentos/", require("./src/routes/departamentos.routes"));
app.use("/eventos/", require("./src/routes/eventos.routes"));
app.use("/categorias/", require("./src/routes/categorias.routes"));
app.use("/ubicaciones/", require("./src/routes/ubicaciones.routes"));
app.use("/coordenadas/", require("./src/routes/coordenadas.routes"));
app.use("/evaluaciones360/", require("./src/routes/evaluaciones360.routes"));
app.use("/viajes/", require("./src/routes/viajes.routes"));
app.use("/gastosMensajeros/", require("./src/routes/gastosMensajeros.routes"));
app.use("/recepciones/", require("./src/routes/recepciones.routes"));
app.use("/unidadMedida/", require("./src/routes/unidadesMedida.routes"));
app.use("/preciosOrden/", require("./src/routes/preciosOrden.routes"));
app.use("/saldosCliente/", require("./src/routes/saldosCliente.routes"));
app.use("/mensajerosGastos/", require("./src/routes/mensajerosGastos.routes"));
app.use("/abonosOrdenes/", require("./src/routes/abonosOrdenes.routes"));

app.use(notFound);
app.use(Sentry.Handlers.errorHandler());
app.use(handleErrors);

// Inicio del servidor en modo local
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { server, app };

