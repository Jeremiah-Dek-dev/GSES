import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, IconButton, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import { toast } from "react-toastify";
import adminApi from "../../../API/adminApi";

const wine = "#4B0F1C";
const gold = "#D4AF37";

const Lists = () => {
  const [rows, setRows] = useState([]);

  const fetchList = async () => {
    try {
      const response = await adminApi.get("/api/design/list");

      if (response.data.success) {
        setRows(response.data.data);
      } else {
        toast.error("Error fetching products");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const removeDesign = async (id) => {
    const response = await adminApi.post("/api/design/remove", { id });

    if (response.data.success) {
      toast.success(response.data.message);
      fetchList();
    } else {
      toast.error("Error removing item");
    }
  };

  const updateQty = async (id, newQty) => {
    if (newQty < 0) return;

    const response = await adminApi.post("/api/design/update-quantity", {
      id,
      quantity: newQty,
    });

    if (response.data.success) {
      fetchList();
    } else {
      toast.error("Error updating quantity");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 90,
      sortable: false,
      renderCell: (params) => (
        <Avatar
          variant="rounded"
          src={`${adminApi.defaults.baseURL}/images/${params.value}`}
          sx={{ width: 40, height: 40 }}
        />
      ),
    },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 160,
    },

    {
      field: "category",
      headerName: "Category",
      flex: 1,
      minWidth: 120,
    },

    {
      field: "price",
      headerName: "Price",
      width: 110,
      renderCell: (params) => (
        <Typography fontWeight={600} color={wine} sx={{ mt: 2 }}>
          ${params.value}
        </Typography>
      ),
    },

    {
      field: "quantity",
      headerName: "Qty",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <IconButton
            size="small"
            sx={{
              bgcolor: wine,
              color: "white",
              "&:hover": { bgcolor: "#3a0b15" },
            }}
            onClick={() => updateQty(params.row._id, params.row.quantity - 1)}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>

          <Typography fontWeight={600}>{params.row.quantity}</Typography>

          <IconButton
            size="small"
            sx={{
              bgcolor: gold,
              color: "white",
              "&:hover": { bgcolor: "#b8962d" },
            }}
            onClick={() => updateQty(params.row._id, params.row.quantity + 1)}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },

    {
      field: "action",
      headerName: "Action",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => removeDesign(params.row._id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, width: "83%" }}>
      <Typography variant="h5" fontWeight={600} mb={2} sx={{ color: wine }}>
        All Product Lists
      </Typography>

      <Box
        sx={{
          height: 520,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: 2,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableRowSelectionOnClick
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: wine,
              color: "white",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#fafafa",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Lists;
