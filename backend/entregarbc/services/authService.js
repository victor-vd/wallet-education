const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Função de registro
const register = async (name, email, password, phone) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('E-mail já está em uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phone
    });

    return newUser;
};

// Função de login
const login = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: '1h'
    });

    return { user, token };
};

// Exportação do módulo
module.exports = {
    register,
    login
};