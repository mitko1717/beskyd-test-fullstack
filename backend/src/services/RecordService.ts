import { Record } from '../entity/Record';
import { AddRecordDTO } from '../dtos/addRecord.dto';
import { EditRecordDTO } from '../dtos/editRecord.dto';

export class RecordService {
  public async getAllRecords() {
    return Record.find();
  }

  async findOneRecord(id: number) {
    const todo = await Record.findOne({ where: { id } });
    return todo;
  }

  public async createRecord(recordData: AddRecordDTO) {
    const newItem = Record.create({
      name: recordData.name,
      address: recordData.address,
      amount: recordData.amount,
      role: recordData.role,
      status: recordData.status,
    });
  
    return Record.save(newItem);
  }

  public async updateRecord(id: number, updatedRecord: EditRecordDTO) {
    await Record.update(id, updatedRecord);
    const updated = await Record.findOne({ where: { id } });
    return updated;
  }

  public async deleteRecord(id: number) {
    const recordToDelete = await Record.findOne({ where: { id } });
    await Record.delete(id);
    return recordToDelete;
  }
}
