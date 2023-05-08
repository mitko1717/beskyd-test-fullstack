import { Router } from 'express';
import { RecordController } from '../controllers/RecordController';

const router: Router = Router();
const recordController = new RecordController();

router.get('/', recordController.getAllRecords);
router.post('/', recordController.createRecord);
router.put('/:id', recordController.updateRecord);
router.delete('/:id', recordController.deleteRecord);

export default router;
