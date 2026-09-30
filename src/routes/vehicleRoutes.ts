import { Router } from 'express';
import { vehicleController } from '../controllers/vehicleController.js';

const router = Router();

router.get('/', vehicleController.listVehicles);
router.get('/:id', vehicleController.getVehicle);
router.post('/', vehicleController.createVehicle);
router.put('/:id', vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

export default router;
