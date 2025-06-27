const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../db/connection');
const User_afa = require('./user.model');
const Cliente = require('./cliente.model');

class CotizacionManual extends Model {}

CotizacionManual.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    periodo: DataTypes.STRING,
    serie: {
        type: DataTypes.STRING,
        defaultValue: '001'
    },
    numero: {
        type: DataTypes.INTEGER,
        unique: true,
        defaultValue: 1
    },
    fecha: DataTypes.STRING,
    tipo_cambio: DataTypes.STRING,
    cliente_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
        model: Cliente,
        key: 'cliente_id'
        }
    },
    punto_venta: DataTypes.STRING,
    razon_social: DataTypes.STRING,
    ruc: DataTypes.STRING,
    nombre_contacto: DataTypes.STRING,
    dni_persona: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING,
    forma_pago: DataTypes.STRING,
    dias_ofertas: DataTypes.STRING,
    moneda: DataTypes.STRING,
    observaciones: DataTypes.STRING,
    total_precio_productos: DataTypes.FLOAT,
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'COTIZADO'
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
        model: User_afa,
        key: 'user_id'
        }
    }
    }, {
    sequelize,
    modelName: 'CotizacionManual'
});

CotizacionManual.beforeCreate(async (cotizacion, options) => {
    const lastCot = await CotizacionManual.findOne({
        order: [['numero', 'DESC']]
});
    cotizacion.numero = lastCot ? lastCot.numero + 1 : 1;
});

module.exports = CotizacionManual;
