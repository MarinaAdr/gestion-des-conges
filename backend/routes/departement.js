import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { ajoutDepartement, getDepartements, getDepartement, modifierDepartement, supprimerDepartement } from '../controllers/departementController.js';

const router = express.Router()

router.get ('/', authMiddleware, getDepartements);
router.post ('/ajout', authMiddleware, ajoutDepartement);
router.get ('/:id', authMiddleware, getDepartement);
router.put ('/:id', authMiddleware, modifierDepartement);
router.delete ('/:id', authMiddleware, supprimerDepartement);


export default router