import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  SelectChangeEvent,
} from "@mui/material";

interface IFiltersProps {
  onFilterChange: (field: "name" | "status" | "role", value: string) => void;
}

const Filters = ({ onFilterChange }: IFiltersProps) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");

  const handleInputChange = (
    field: "name" | "status" | "role",
    value: string
  ) => {
    if (field === "name") {
      setName(value);
    } else if (field === "status") {
      setStatus(value);
    } else if (field === "role") {
      setRole(value);
    }

    onFilterChange(field, value); // Call onFilterChange with field and value
  };

  return (
    <Grid container spacing={2} sx={{ margin: "0 1rem" }}>
      <Grid item sx={{ marginBottom: "1rem" }}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </Grid>
      <Grid item sx={{ marginBottom: "1rem" }}>
        <FormControl variant="outlined" sx={{ width: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={status}
            onChange={(e: SelectChangeEvent) =>
              handleInputChange("status", e.target.value as string)
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item sx={{ marginBottom: "1rem" }}>
        <FormControl variant="outlined" sx={{ width: 200 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e: SelectChangeEvent) =>
              handleInputChange("role", e.target.value as string)
            }
          >
            <MenuItem value="">Select Role</MenuItem>
            <MenuItem value="Customer">Customer</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Filters;
