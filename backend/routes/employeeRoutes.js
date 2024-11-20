const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');



// Créer un nouvel employé
router.post('/', employeeController.create);

// Récupérer tous les employés
router.get('/', employeeController.findAll);

// Récupérer un employé spécifique
router.get('/:id', employeeController.findOne);

// Mettre à jour un employé
router.put('/:id', employeeController.update);

// Supprimer un employé
router.delete('/:id', employeeController.delete);

module.exports = router; 