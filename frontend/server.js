require('dotenv').config();  // Carregar variáveis de ambiente
const express = require('express');
const { Pool } = require('pg');
const sequelize = require('./config/database');  // Importa a configuração do Sequelize
const authController = require('./controllers/authController');  // Importa o controlador de autenticação
const app = express();
const PORT = 3000;

app.use(express.json());  // Middleware para parsear JSON

// Verificação e Log das Configurações do Banco de Dados
if (!process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_HOST || !process.env.DB_NAME || !process.env.JWT_SECRET) {
    console.error("Configurações de banco de dados ou JWT_SECRET ausentes!");
    process.exit(1);
}

console.log("Configurações do Banco:", {
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT
});

// Configuração do banco de dados PostgreSQL (para consultas com Pool)
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT, 10) || 5432,  // parseInt para garantir que é um número
});

// Rota para registro de usuário
app.post('/api/auth/register', authController.register);

// Rota para buscar dados de usuários
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar usuários');
    }
});

// Rota para buscar dados de cursos
app.get('/courses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM courses');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar cursos');
    }
});

// Rota para buscar progresso dos cursos
app.get('/progress', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM progress');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar progresso');
    }
});

// Sincronização do Sequelize e inicialização do servidor
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log('Servidor rodando na porta ${PORT}');
        });
    })
    .catch(error => console.error('Não foi possível sincronizar o banco de dados:', error));