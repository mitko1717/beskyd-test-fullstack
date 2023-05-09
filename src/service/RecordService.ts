import axios from 'axios';
import { IAddRecord } from '../types/addRecord';
import { IEditRecord } from '../types/editRecord';

const API_BASE_URL = 'http://localhost:5000/api/records';

class RecordService {
  public async getAllRecords(name?: string, status?: string, role?: string) {
    try {
      const params = { name, status, role };
      const response = await axios.get(API_BASE_URL, { params });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch records');
    }
  }

  public async findOneRecord(id: number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch record');
    }
  }

  public async createRecord(recordData: IAddRecord) {
    try {
      const response = await axios.post(API_BASE_URL, recordData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create record');
    }
  }

  public async updateRecord(id: number, updatedRecord: IEditRecord) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedRecord);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update record');
    }
  }

  public async deleteRecord(id: number) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete record');
    }
  }
}

export const recordService = new RecordService();