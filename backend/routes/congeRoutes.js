const express = require('express');
const router = express.Router();
const congeController = require('../controllers/congeController');

// Modifier la route pour correspondre à l'appel du frontend
router.post('/', congeController.createConge);

// Route pour obtenir tous les congés
router.get('/', congeController.getAllConges);

// Route pour obtenir les congés d'un utilisateur spécifique
router.get('/user/:userId', congeController.getCongesByUser);

// Route pour mettre à jour le statut d'un congé
router.patch('/:congeId/status', congeController.updateCongeStatus);

module.exports = router;
