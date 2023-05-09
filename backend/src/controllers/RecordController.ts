import { Request, Response, NextFunction } from 'express';
import { RecordService } from '../services/RecordService';
import { AddRecordDTO } from '../dtos/addRecord.dto';
import { EditRecordDTO } from '../dtos/editRecord.dto';

export class RecordController {
  private recordService: RecordService;

  constructor() {
    this.recordService = new RecordService();
  }

  public getAllRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const records = await this.recordService.getAllRecords();
      res.json(records);
    } catch (error) {
      next(error);
    }
  }


  public findOneRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const record = await this.recordService.findOneRecord(parseInt(req.params.id));
      if (!record) return res.status(404).json({ error: 'Record not found' });
      res.json(record);
    } catch (error) {
      next(error);
    }
  }

  public createRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, address, amount, role, status } = req.body as AddRecordDTO;
      const newRecord = await this.recordService.createRecord({name, address, amount, role, status});
      res.status(201).json(newRecord);
    } catch (error) {
      next(error);
    }
  }

  public updateRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recordId = parseInt(req.params.id);
      const { name, address, amount, role, status } = req.body as EditRecordDTO;
      const updatedRecord = await this.recordService.updateRecord(recordId, {
          name, address, amount, role, status,
          id: recordId
      });

      if (updatedRecord) return res.status(404).json({ error: 'Record not found' });
      res.json(updatedRecord);
    } catch (error) {
      next(error);
    }
  }

  public deleteRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recordId = parseInt(req.params.id);
      const deletedRecord = await this.recordService.deleteRecord(recordId);

      if (!deletedRecord) return res.status(404).json({ error: 'Record not found' });

      res.json({ message: 'Record deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
