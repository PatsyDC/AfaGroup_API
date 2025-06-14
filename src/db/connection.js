// src/db/connection.js
const { Sequelize } = require('sequelize');

// Configurar la conexión a la base de datos
const sequelize = new Sequelize('mysql://root:SLJeDZswRFLcXGdrjcrOpjYLHaxlykot@shuttle.proxy.rlwy.net:58368/railway', {
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
