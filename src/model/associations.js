const CotizacionManual = require('./cotizacionManual.model');
const CotizacionProducto = require('./prodCM.model');
const Cliente = require('./cliente.model');
const User_afa = require('./user.model');
const productoAG = require('./productoAG.model');

// Cliente - Cotización
CotizacionManual.belongsTo(Cliente, { foreignKey: 'cliente_id' });
Cliente.hasMany(CotizacionManual, { foreignKey: 'cliente_id' });

// Usuario - Cotización
CotizacionManual.belongsTo(User_afa, { foreignKey: 'user_id' });
User_afa.hasMany(CotizacionManual, { foreignKey: 'user_id' });

// Cotización - Productos
CotizacionManual.hasMany(CotizacionProducto, { foreignKey: 'cotizacion_id' });
CotizacionProducto.belongsTo(CotizacionManual, { foreignKey: 'cotizacion_id' });

// ProductoAG - CotizacionProducto
CotizacionProducto.belongsTo(productoAG, { foreignKey: 'producto_id' });
productoAG.hasMany(CotizacionProducto, { foreignKey: 'producto_id' });

module.exports = {
    CotizacionManual,
    CotizacionProducto,
    Cliente,
    User_afa,
    productoAG
};
