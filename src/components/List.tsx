import { Alert, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { recordService } from "../service/RecordService";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Filters from "./Filters";
import { IParams, IRecord } from "../models/interfaces";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import { REQ_KEY } from "../query-const";

const List = () => {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [idToEdit, setIsToEdit] = useState<number>(1)

  const handleAddModal = () => {
    setIsAddModalOpen((prev) => !prev);
  };

  const deleteRecord = useMutation(
    (id: number) => recordService.deleteRecord(id),
    {
      onSuccess: () => {
        queryClient.refetchQueries(REQ_KEY);
        toast.success("deleted successfully!");
      },
      onError: (e: AxiosError) => {
        toast.error(`it wasnt deleted! ${e.message}`);
      },
    }
  );

  const [filters, setFilters] = useState({
    name: "",
    status: "",
    role: "",
  });

  const [queryK, setQueryK] = useState<QueryKey>([
    REQ_KEY,
    { name: "", status: "", role: "" },
  ]);

  const fetchR = async ({ queryKey }: { queryKey: QueryKey }) => {
    const [, params] = queryKey as [string, IParams];
    const { name = "", status = "", role = "" } = params;
    return recordService.getAllRecords(name, status, role);
  };

  const { data, isLoading, isError } = useQuery<IRecord[]>(queryK, fetchR, {
    refetchOnWindowFocus: false,
  });

  const handleEditModal = () => {
    setIsEditModalOpen((prev) => !prev);
  };

  const handleButtonDelete = (row: IRecord) => {
    deleteRecord.mutate(row.id);
  };

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));

    const params = {
      name: field === "name" ? value : filters.name,
      status: field === "status" ? value : filters.status,
      role: field === "role" ? value : filters.role,
    };

    setQueryK([REQ_KEY, params]); // update the query key with the new filter values
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "amount", headerName: "Amount", width: 120 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            onClick={() => {setIsToEdit(params.row.id); handleEditModal()}}
          >
            &#x270D;
          </Button>
          <Button
            variant="contained"
            onClick={() => handleButtonDelete(params.row)}
          >
            &#x2715;
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <AddModal isOpen={isAddModalOpen} handleOpenModal={handleAddModal} />
      <EditModal isOpen={isEditModalOpen} handleOpenModal={handleEditModal} id={idToEdit}/>
      <Button
        sx={{ margin: "1rem 2rem" }}
        variant="contained"
        onClick={handleAddModal}
      >
        add record
      </Button>
      <Filters onFilterChange={handleFilterChange} />

      {isError && (
        <Alert severity="error">This is an error alert — check it out!</Alert>
      )}
      {isLoading && <CircularProgress />}
      {data && (
        <div style={{ height: 400, width: "90%", margin: "2rem auto" }}>
          <DataGrid columns={columns} rows={data} />
        </div>
      )}
    </div>
  );
};

export default List;
