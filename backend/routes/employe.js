import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { ajoutEmploye, upload } from '../controllers/employeController.js';

const router = express.Router()

router.post ('/ajout', authMiddleware, upload.single('image'), ajoutEmploye);


export default router