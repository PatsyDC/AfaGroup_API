const express = require('express');
const categoriaRouter = require('./categoria.router');
const usuariosRouter = require('./user.router');
const contactoRouter = require('./contacto.router');
const clienteRouter = require('./cliente.router');
const puntoVRouter = require('./punto_venta.router');
const productRouter = require('./productoAG.router');
const carritoRouter = require('./carrito.router');
const cotizacionWeb = require('./cotizacionWeb.router');
const cotizacionManual = require('./cotizacionManual.router');
const cotizacionProdManual = require('./prodCM.router');

const router = express.Router();

// Usa las rutas de categoria y usuarios
router.use('/', categoriaRouter);
router.use('/', usuariosRouter);
router.use('/', contactoRouter);
router.use('/', clienteRouter);
router.use('/', puntoVRouter);
router.use('/', productRouter);
router.use('/', carritoRouter);
router.use('/', cotizacionWeb);
router.use('/', cotizacionManual);
router.use('/', cotizacionProdManual)

module.exports = router;
