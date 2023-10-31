import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTrade, getTrades } from "../../services/apiTrades";

import { useState } from "react";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import BasicModal from "../../ui/BasicModal";
import { Button, Typography } from "@mui/material";
import clsx from "clsx";
import toast from "react-hot-toast";

const columns = [
  { field: "date", headerName: "Date", width: 220 },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    cellClassName: (params) => {
      if (params.value === null) {
        return "";
      }

      return clsx("color", {
        negative: params.value === "sell",
        positive: params.value === "buy",
      });
    },
  },
  { field: "pair", headerName: "Pair", width: 180 },
  { field: "session", headerName: "Session", width: 220 },
  {
    field: "outcome",
    headerName: "Outcome",
    width: 160,
  },
  {
    field: "profit",
    headerName: "Profit",
    type: "number",
    width: 150,
    align: "right",
    cellClassName: (params) => {
      if (params.value === null) {
        return "";
      }

      return clsx("color", {
        negative: params.value < 0,
        positive: params.value > 0,
      });
    },
  },
];

const optionsModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const deleteModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",

  backdrop: "none",
};

export default function DataTable() {
  const [selectedRowId, setSelectedRowId] = useState("");

  const [optionsModalOpen, setOptionsModalOpen] = useState(false);
  const handleOptionsModalOpen = () => setOptionsModalOpen(true);
  const handleOptionsModalClose = () => setOptionsModalOpen(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const queryClient = useQueryClient();

  const {
    data: trades,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trades"],
    queryFn: getTrades,
  });

  const { mutate } = useMutation({
    mutationFn: deleteTrade,
    onSuccess: () => {
      toast.success("Trade successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["trades"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ height: 400, width: "100%" }} className="uppercase">
      <DataGrid
        sx={{
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .color.negative": {
            color: "#dc2626",
          },
          "& .color.positive": {
            color: "#16a34a",
          },
        }}
        rows={trades}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        autoHeight
        onRowClick={(rows) => {
          handleOptionsModalOpen();
          setSelectedRowId(rows.id);
        }}
        rowSelection={false}
      />
      {optionsModalOpen && (
        <BasicModal
          open={optionsModalOpen}
          handleClose={handleOptionsModalClose}
          style={optionsModalStyle}
        >
          <div className="flex justify-evenly">
            <Button variant="outlined">View</Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                handleDeleteModalOpen();
              }}
            >
              Delete
            </Button>
          </div>
        </BasicModal>
      )}
      {deleteModalOpen && (
        <BasicModal
          open={deleteModalOpen}
          handleClose={() => {
            handleDeleteModalClose();
            handleOptionsModalClose();
          }}
          style={deleteModalStyle}
        >
          <div className="mb-6 ml-5">
            <Typography id="modal-modal-description" sx={{ mt: 0 }}>
              Are you sure you want to delete this trade? This action can't be
              undone.
            </Typography>
          </div>
          <div className="flex justify-evenly">
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                mutate(selectedRowId);
                handleOptionsModalClose();
                handleDeleteModalClose();
              }}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleOptionsModalClose();
                handleDeleteModalClose();
              }}
            >
              Cancel
            </Button>
          </div>
        </BasicModal>
      )}
    </div>
  );
}
