const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const employeeController = require('../controllers/employeeController');

// Configuration de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Assurez-vous que ce dossier existe
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Le fichier doit être une image'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // limite à 5MB
  }
});

// Créer un nouvel employé
router.post('/', employeeController.create);

// Récupérer tous les employés
router.get('/', employeeController.findAll);

// Récupérer un employé spécifique
router.get('/:id', employeeController.findOne);

// Nouvelle route pour la mise à jour des credentials
router.put('/:id/update-credentials', upload.single('photo'), employeeController.updateCredentials);

// Route générique pour mettre à jour un employé
router.put('/:id', upload.single('image'), employeeController.update);

// Supprimer un employé
router.delete('/:id', employeeController.delete);


module.exports = router; 