import { Record } from "../entity/Record";
import { AddRecordDTO } from "../dtos/addRecord.dto";
import { EditRecordDTO } from "../dtos/editRecord.dto";
import { IParams } from "../types/getAllParams";

export class RecordService {
  public async getAllRecords({ name, status, role }: IParams) {
    const query = Record.createQueryBuilder('record');
  
    query
      .andWhere(
        name && name.length >= 3
          ? 'record.name ILIKE :name OR record.address ILIKE :name'
          : '1=1',
        { name: `%${name}%` }
      )
      .andWhere(status ? 'record.status = :status' : '1=1', { status })
      .andWhere(role ? 'record.role = :role' : '1=1', { role });
  
    return await query.getMany();;
  }

  async findOneRecord(id: number) {
    const todo = await Record.findOne({ where: { id } });
    return todo;
  }

  public async createRecord(recordData: AddRecordDTO) {
    const newRecord = Record.create({ ...recordData });
    return Record.save(newRecord);
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
