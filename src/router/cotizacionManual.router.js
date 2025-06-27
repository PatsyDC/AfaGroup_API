const router = require('express').Router();
const CotizacionManual = require('../model/cotizacionManual.model');

router.get('/cotizaciones/', async (req, res) => {
try {
    const cotizaciones = await CotizacionManual.findAll();
    res.status(200).json({
        ok: true,
        status: 200,
        body: cotizaciones
    });
    } catch (error) {
    res.status(500).json({
        ok: false,
        message: 'Error al obtener cotizaciones',
        error: error.message
    });
}
});


router.get('/cotizaciones/:id', async (req, res) => {
try {
    const cotizacion = await CotizacionManual.findOne({
        where: { id: req.params.id }
    });
    if (!cotizacion) {
        return res.status(404).json({
        ok: false,
        message: 'Cotización no encontrada'
        });
    }
    res.status(200).json({
        ok: true,
        status: 200,
        body: cotizacion
    });
    } catch (error) {
    res.status(500).json({
        ok: false,
        message: 'Error al buscar cotización',
        error: error.message
    });
}
});


router.post('/cotizaciones/', async (req, res) => {
try {
    await CotizacionManual.sync(); // asegura que la tabla exista
    const cotizacion = await CotizacionManual.create(req.body);
    res.status(201).json({
        ok: true,
        status: 201,
        message: 'Cotización creada correctamente',
        body: cotizacion
    });
    } catch (error) {
    res.status(500).json({
        ok: false,
        message: 'Error al crear cotización',
        error: error.message
    });
}
});


router.put('/cotizaciones/:id', async (req, res) => {
try {
    const updated = await CotizacionManual.update(req.body, {
        where: { id: req.params.id }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Cotización actualizada',
        body: updated
    });
    } catch (error) {
    res.status(500).json({
        ok: false,
        message: 'Error al actualizar cotización',
        error: error.message
    });
}
});


router.delete('/cotizaciones/:id', async (req, res) => {
try {
    const deleted = await CotizacionManual.destroy({
        where: { id: req.params.id }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        message: 'Cotización eliminada',
        body: deleted
    });
    } catch (error) {
    res.status(500).json({
        ok: false,
        message: 'Error al eliminar cotización',
        error: error.message
    });
}
});

module.exports = router;
