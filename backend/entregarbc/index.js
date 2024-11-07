require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const authController = require('./controllers/authController'); 
const progressController = require('./controllers/progressController'); 
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Rotas de autenticação
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

// Rotas de progresso
app.post('/api/progress/update', progressController.updateProgress);
app.get('/api/progress/percentage', progressController.getProgressPercentage);

// Conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        sequelize.sync()
            .then(() => {
                console.log('Modelos sincronizados com o banco de dados.');
                app.listen(PORT, () => {
                    console.log(`Servidor rodando na porta ${PORT}`);
                });
            })
            .catch(syncError => {
                console.error('Erro ao sincronizar os modelos com o banco de dados:', syncError);
            });
    })
    .catch(connectionError => {
        console.error('Erro ao conectar com o banco de dados:', connectionError);
    });