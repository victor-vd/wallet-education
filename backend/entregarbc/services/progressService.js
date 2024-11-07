const UserProgress = require('../models/UserProgress');

// Atualiza o progresso do usuário em um curso específico
const updateProgress = async (userId, courseId, progress) => {
    try {
        if (!userId || !courseId || typeof progress !== 'number') {
            throw new Error("Parâmetros inválidos: userId, courseId ou progress estão ausentes ou incorretos.");
        }

        console.log("userId:", userId, "courseId:", courseId, "progress:", progress);

        // Procura por um registro de progresso existente
        let userProgress = await UserProgress.findOne({ where: { userId, courseId } });

        if (!userProgress) {
            // Cria um novo registro se não houver progresso para o curso
            userProgress = await UserProgress.create({ userId, courseId, progress });
        } else {
            // Atualiza o progresso existente
            userProgress.progress = progress;
            await userProgress.save();
        }

        return userProgress;
    } catch (error) {
        console.error('Erro ao atualizar progresso:', error);
        throw error;
    }
};

// Obtém a porcentagem de progresso do usuário em um curso específico
const getProgressPercentage = async (userId, courseId) => {
    try {
        if (!userId || !courseId) {
            throw new Error("Parâmetros inválidos: userId ou courseId estão ausentes.");
        }

        // Encontra o progresso do usuário no curso
        const userProgress = await UserProgress.findOne({ where: { userId, courseId } });

        // Se não houver registro, retorna 0% de progresso
        return userProgress ? userProgress.progress : 0;
    } catch (error) {
        console.error('Erro ao obter porcentagem de progresso:', error);
        throw error;
    }
};

module.exports = { updateProgress, getProgressPercentage };