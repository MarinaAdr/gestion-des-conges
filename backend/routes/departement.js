import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { ajoutDepartement } from '../controllers/departementController.js';

const router = express.Router()

router.post ('/ajout', authMiddleware, ajoutDepartement);

export default router