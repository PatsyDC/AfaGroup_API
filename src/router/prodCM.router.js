const router = require('express').Router();
const CotizacionProducto = require('../model/prodCM.model');

// GET: todos los productos cotizados
router.get('/cotizacion-productos/', async (req, res) => {
try {
    const productos = await CotizacionProducto.findAll();
    res.status(200).json({
        ok: true,
        status: 200,
        body: productos
    });
    } catch (error) {
    res.status(500).json({
        ok: false,
        message: 'Error al obtener productos cotizados',
        error: error.message
    });
    }
});

// GET: productos por ID de cotización
router.get('/cotizacion-productos/cotizacion/:cotizacion_id', async (req, res) => {
try {
    const productos = await CotizacionProducto.findAll({
        where: { cotizacion_id: req.params.cotizacion_id }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: productos
    });
    } catch (error) {
    res.status(500).json({
        ok: false,
        message: 'Error al obtener productos de cotización',
        error: error.message
    });
}
});

// POST: crear producto cotizado
router.post('/cotizacion-productos/', async (req, res) => {
try {
    await CotizacionProducto.sync();

    const nuevo = await CotizacionProducto.create(req.body);

    res.status(201).json({
        ok: true,
        status: 201,
        message: 'Producto cotizado creado',
        body: nuevo
    });
    } catch (error) {
    res.status(500).json({
        ok: false,
        message: 'Error al crear producto cotizado',
        error: error.message
    });
}
});

// PUT: actualizar producto cotizado
router.put('/cotizacion-productos/:id', async (req, res) => {
try {
    const actualizado = await CotizacionProducto.update(req.body, {
        where: { id: req.params.id }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Producto cotizado actualizado',
        body: actualizado
    });
    } catch (error) {
    res.status(500).json({
        ok: false,
        message: 'Error al actualizar producto',
        error: error.message
    });
}
});

// DELETE: eliminar producto cotizado
router.delete('/cotizacion-productos/:id', async (req, res) => {
try {
    const eliminado = await CotizacionProducto.destroy({
        where: { id: req.params.id }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Producto cotizado eliminado',
        body: eliminado
    });
    } catch (error) {
    res.status(500).json({
        ok: false,
        message: 'Error al eliminar producto',
        error: error.message
    });
}
});

module.exports = router;
