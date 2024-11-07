const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING, // Campo opcional para armazenar o telefone
        allowNull: false,
    },
}, {
    timestamps: false,
});

// Adiciona método para validar a senha
User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Garante que a senha seja criptografada antes de ser salva no banco de dados
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;