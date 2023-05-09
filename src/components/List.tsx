import { Alert, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { QueryKey, useQuery } from 'react-query';
import { RecordService } from '../service/RecordService';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Filters from './Filters';
import { IRecord } from '../models/interfaces';

interface IParams {
  name: string;
  status: string;
  role: string;
}

const REQ_KEY = 'records'
const recordService = new RecordService();

const List = () => {
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    role: '',
  });

  const [queryK, setQueryK] = useState<QueryKey>([
    REQ_KEY,
    { name: '', status: '', role: '' }
  ]);

  const fetchR = async ({ queryKey }: { queryKey: QueryKey }) => {
    const [, params] = queryKey as [string, IParams];
    const {
      name = '',
      status = '',
      role = ''
    } = params;
    return recordService.getAllRecords(
      name,
      status,
      role
    );
  };

  const {
    data,
    isLoading,
    isError
  } = useQuery<IRecord[]>(queryK, fetchR, {
    refetchOnWindowFocus: false
  });

  const handleButtonClick = (row: number) => {
    console.log('Button clicked for row:', row);
  };

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  
    const params = {
      name: field === 'name' ? value : filters.name,
      status: field === 'status' ? value : filters.status,
      role: field === 'role' ? value : filters.role,
    };
  
    setQueryK([REQ_KEY, params]); // update the query key with the new filter values
  };
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 120 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'status', headerName: 'Status', width: 150},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button variant="contained" onClick={() => handleButtonClick(params.row)}>edit</Button>
      ), 
    },
  ];

  return (
    <div>
      <Button sx={{margin: '1rem 2rem'}} variant="contained">add record</Button>
      <Filters onFilterChange={handleFilterChange} />

      {isError && <Alert severity="error">This is an error alert — check it out!</Alert>}
      {isLoading && <CircularProgress />}
      {data && <div style={{ height: 400, width: '90%', margin: '2rem auto' }}>
          <DataGrid columns={columns} rows={data} />
        </div>
      }
    </div>
  )
}

export default List