    const { DataTypes } = require('sequelize');
    const sequelize = require('../config/database'); // Importa a instância do Sequelize

    // Define o modelo UserProgress com as colunas e tipos de dados
    const UserProgress = sequelize.define('UserProgress', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        progress: {
            type: DataTypes.INTEGER, // Percentual de progresso (0 a 100)
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        timestamps: false, // Desativa os campos createdAt e updatedAt
    });

    module.exports = UserProgress;