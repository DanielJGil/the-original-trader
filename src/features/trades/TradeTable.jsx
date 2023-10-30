import { useQuery } from "@tanstack/react-query";
import { getTrades } from "../../services/apiTrades";

import { useState } from "react";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import BasicModal from "../../ui/Modal";
import { Button, Typography } from "@mui/material";
import clsx from "clsx";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";

const columns = [
  { field: "date", headerName: "Date", width: 220 },
  { field: "type", headerName: "Type", width: 150 },
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
    // sortable: false,
    width: 150,
    align: "right",
    cellClassName: (params) => {
      if (params.value == null) {
        return "";
      }

      return clsx("color", {
        negative: params.value < 0,
        positive: params.value > 0,
      });
    },
  },
];

export default function DataTable() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    data: trades,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trades"],
    queryFn: getTrades,
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
            // fontWeight: "600",
          },
          "& .color.positive": {
            color: "#16a34a",
            // fontWeight: "600",
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
          handleOpen();
        }}
      />

      {open && (
        <BasicModal open={open} handleClose={handleClose}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <div className="flex justify-evenly">
            <Button variant="outlined">View</Button>
            <Button color="error" variant="outlined">
              Delete
            </Button>
          </div>
        </BasicModal>
      )}
    </div>
  );
}
