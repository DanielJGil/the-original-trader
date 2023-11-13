import { useState } from "react";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import BasicModal from "../../ui/BasicModal";
import { Button, Paper, Typography } from "@mui/material";
import clsx from "clsx";

import { useTrades } from "./useTrades";
import { useDeleteTrade } from "./useDeleteTrade";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { ErrorOutline } from "@mui/icons-material";
import { useUser } from "../authentication/useUser";
import { useDarkMode } from "../../context/DarkModeContext";
import Spinner from "../../ui/Spinner";

const columns = [
  { field: "date", headerName: "Date", width: 200 },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    cellClassName: (params) => {
      if (params.value === null) {
        return "";
      }

      return clsx("color", {
        negative: params.value === "SELL",
        positive: params.value === "BUY",
      });
    },
  },
  { field: "pair", headerName: "Pair", width: 180 },
  { field: "session", headerName: "Session", width: 240 },
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
  const { isDarkMode } = useDarkMode();

  const navigate = useNavigate();

  const [selectedRowId, setSelectedRowId] = useState("");

  const [optionsModalOpen, setOptionsModalOpen] = useState(false);
  const handleOptionsModalOpen = () => setOptionsModalOpen(true);
  const handleOptionsModalClose = () => setOptionsModalOpen(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const { trades, isLoading } = useTrades();
  const { user } = useUser();
  const { deleteTrade } = useDeleteTrade();

  const tradesWithFormattedDate = trades?.map((trade) => ({
    ...trade,
    date: dayjs(trade.date).format("MM/D/YYYY"),
  }));

  const userTrades = tradesWithFormattedDate?.filter(
    (trade) => trade.userId === user.id
  );

  if (isLoading) return <Spinner />;

  if (!isLoading && !userTrades.length)
    return (
      <div className="flex justify-center mt-20 font-semibold">
        <Paper elevation={0} sx={{ padding: 3 }} className="space-x-2">
          <ErrorOutline />
          <span>
            You haven't added any trades yet. Please start by adding a new one.
          </span>
        </Paper>
      </div>
    );

  return (
    <div style={{ height: 400, width: "100%" }} className="">
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

          border: isDarkMode && 0,
          backgroundColor: isDarkMode ? "#18212f" : "#fff",
          fontWeight: 500,

          "& .MuiDataGrid-cell": {
            borderBottom: isDarkMode && 1,
            borderBottomColor: isDarkMode && "#282c35",
            cursor: "pointer",
            paddingLeft: 2,
          },

          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },

          ".MuiDataGrid-columnHeaders ": {
            borderBottomColor: isDarkMode && "#282c35",
            paddingLeft: 0.6,
          },

          ".MuiDataGrid-footerContainer ": {
            borderTopColor: isDarkMode && "#282c35",
          },

          ".MuiSvgIcon-root": {
            color: isDarkMode && "#f1f5f9",
          },
        }}
        rows={!isLoading && userTrades}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        autoHeight
        onRowClick={(rows) => {
          handleOptionsModalOpen();
          setSelectedRowId(rows.id);
        }}
        rowSelection={false}
        disableColumnMenu
      />
      {optionsModalOpen && (
        <BasicModal
          open={optionsModalOpen}
          handleClose={handleOptionsModalClose}
          style={optionsModalStyle}
        >
          <div className="flex justify-evenly">
            <Button
              variant="outlined"
              onClick={() => navigate(`/trades/${selectedRowId}`)}
            >
              View
            </Button>
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
                deleteTrade(selectedRowId);
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
