import { Router } from 'express';
import { RecordController } from '../controllers/RecordController';

const router: Router = Router();
const recordController = new RecordController();

router.get('/', recordController.getAllRecords);
router.get('/:id', recordController.findOneRecord);
router.post('/', recordController.createRecord);
router.put('/:id', recordController.updateRecord);
router.delete('/:id', recordController.deleteRecord);

export default router;

// add record
// POST http://localhost:5000/api/records/
// {
//     "name": "John Dima",
//     "address": "18 Main St",
//     "amount": 1700,
//     "role": "Admin",
//     "status": "Open"
//   }
