import express from 'express';
import {
  addRegister,
  updateRegister,
  deleteRegister,
  getRegister,
  getRegistersByUserId,
} from '../controllers/addRegisterController.js'; // Importa las funciones relacionadas con los registros
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas para registros
router.post('/add-register', protect, addRegister); // Agregar un registro
router.put('/update-register/:id', protect, updateRegister); // Actualizar un registro por ID
router.delete('/delete-register/:id', protect, deleteRegister); // Eliminar un registro por ID
router.get('/get-register/:id', protect, getRegister); // Obtener un registro por ID
router.get('/get-registers/:idUsuario', protect, getRegistersByUserId);

export default router;
