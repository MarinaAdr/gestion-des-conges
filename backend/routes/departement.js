import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { ajoutDepartement, getDepartements } from '../controllers/departementController.js';

const router = express.Router()

router.get ('/', authMiddleware, getDepartements);
router.post ('/ajout', authMiddleware, ajoutDepartement);


export default router