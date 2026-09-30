import { Router } from 'express';
import { clientController } from '../controllers/clientController.js';

const router = Router();

router.get('/', clientController.listClients);
router.get('/:id', clientController.getClient);
router.get('/:id/vehicles', clientController.getClientVehicles);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

export default router;
