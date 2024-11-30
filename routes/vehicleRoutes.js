import express from 'express';
import { createVehicle, getAllVehicles, updateVehicle, deleteVehicle } from '../controllers/vehicleController.js';
import { isAdmin } from '../middleware/roleMiddleware.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.post('/', isAdmin, upload.single('image'), createVehicle); // Admin only
router.get('/', getAllVehicles); // Anyone can view vehicles
router.put('/:vehicleId', isAdmin, upload.single('image'), updateVehicle); // Admin only
router.delete('/:vehicleId', isAdmin, deleteVehicle); // Admin only

export default router;
