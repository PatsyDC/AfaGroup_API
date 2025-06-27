const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/connection');
const productoAG = require('./productoAG.model');

class CotizacionProducto extends Model {}

CotizacionProducto.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    cotizacion_id: {
        type: DataTypes.UUID,
        allowNull: false
        // asociación se hace luego
    },
    producto_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
        model: productoAG,
        key: 'producto_id'
        }
    },
    nombre_producto: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    cantidad: DataTypes.INTEGER,
    unidad: DataTypes.STRING,
    subtotal: DataTypes.FLOAT
    }, {
    sequelize,
    modelName: 'CotizacionProducto'
});

module.exports = CotizacionProducto;
