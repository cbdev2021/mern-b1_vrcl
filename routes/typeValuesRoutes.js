import express from 'express';
import {
  addTypeValues,
  updateTypeValues,
  deleteTypeValues,
  getTypeValues,
  getTypeValuesByUserId,
} from '../controllers/typeValuesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas para tipos de valor
router.post('/add-type-value', protect, addTypeValues);
router.put('/update-type-value/:id', protect, updateTypeValues);
router.delete('/delete-type-value/:id', protect, deleteTypeValues);
router.get('/get-type-value/:id', protect, getTypeValues);
router.get('/get-type-values/:idUsuario', protect, getTypeValuesByUserId);

export default router;
