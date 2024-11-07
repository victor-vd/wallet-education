const progressService = require('../services/progressService');

// Controlador de progresso
const progressController = {};

// Atualiza o progresso do usuário em um curso específico
progressController.updateProgress = async (req, res) => {
    try {
        const { userId, courseId, progress } = req.body;

        if (!userId || !courseId || typeof progress !== 'number') {
            return res.status(400).json({ error: 'Parâmetros inválidos: userId, courseId ou progress estão ausentes ou incorretos.' });
        }

        const updatedProgress = await progressService.updateProgress(userId, courseId, progress);
        res.json(updatedProgress);
    } catch (error) {
        console.error('Erro ao atualizar progresso:', error);
        res.status(500).json({ error: 'Erro ao atualizar o progresso' });
    }
};

// Obtém a porcentagem de progresso do usuário em um curso específico
progressController.getProgressPercentage = async (req, res) => {
    try {
        const { userId, courseId } = req.query;

        if (!userId || !courseId) {
            return res.status(400).json({ error: 'Parâmetros inválidos: userId ou courseId ausentes.' });
        }

        const percentage = await progressService.getProgressPercentage(userId, courseId);
        res.json({ percentage });
    } catch (error) {
        console.error('Erro ao obter porcentagem de progresso:', error);
        res.status(500).json({ error: 'Erro ao obter a porcentagem de progresso' });
    }
};

module.exports = progressController;