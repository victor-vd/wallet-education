const User = require('../models/User'); // Modelo User para acessar os dados do usuário
const authService = require('../services/authService'); // Importa o serviço de autenticação

// Controlador de autenticação
const authController = {};

// Função de registro para criar um novo usuário
authController.register = async (req, res) => {
    const { name, email, password, phone } = req.body; // Extraindo os dados do usuário

    try {
        // Chama o serviço de registro
        const newUser = await authService.register(name, email, password, phone);
        res.status(201).json({ success: true, userId: newUser.id }); // Retorna o ID do novo usuário
    } catch (error) {
        console.error('Erro ao registrar o usuário:', error);
        res.status(400).json({ success: false, message: error.message }); // Retorna erro se falhar
    }
};

// Função de login para autenticar o usuário e retornar o userId
authController.login = async (req, res) => {
    const { email, password } = req.body; // Alterado para email em vez de username
    console.log("Tentando logar com:", { email, password }); // Log dos dados recebidos

    try {
        // Busca o usuário no banco de dados
        const user = await User.findOne({ where: { email } }); // Alterado para buscar por email
        console.log("Usuário encontrado:", user); // Log do usuário encontrado

        if (!user) {
            return res.status(401).json({ success: false, message: 'Usuário não encontrado' });
        }

        // Verifica a senha (supondo que tenha a função validatePassword)
        const passwordIsValid = await user.validatePassword(password);
        console.log("Senha válida:", passwordIsValid); // Log da validação da senha

        if (!passwordIsValid) {
            return res.status(401).json({ success: false, message: 'Senha incorreta' });
        }

        // Autenticação bem-sucedida, retorna o userId do usuário
        res.json({ success: true, userId: user.id });
    } catch (error) {
        console.error('Erro no login:', error); // Log do erro detalhado
        res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
};

// Função para verificar se o usuário está autenticado (para rotas protegidas)
authController.isAuthenticated = (req, res, next) => {
    const userId = req.session.userId || req.headers.authorization; // Exemplo de autenticação simples

    if (!userId) {
        return res.status(403).json({ success: false, message: 'Acesso negado' });
    }

    req.userId = userId; // Adiciona o userId à requisição
    next();
};

module.exports = authController;