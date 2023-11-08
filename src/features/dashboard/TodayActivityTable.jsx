import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTrades } from "../trades/useTrades";
import { useUser } from "../authentication/useUser";
import dayjs from "dayjs";
import clsx from "clsx";
import Spinner from "../../ui/Spinner";
import { useDarkMode } from "../../context/DarkModeContext";

const columns = [
  {
    id: "type",
    label: "Type",
    minWidth: 100,
  },
  {
    id: "pair",
    label: "Pair",
    minWidth: 120,
  },
  { id: "session", label: "Session", minWidth: 170 },
  {
    id: "profit",
    label: "Profit",
    // type: "number",
    minWidth: 50,
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

export default function TodayActivityTable() {
  const { trades, isLoading } = useTrades();
  const { user } = useUser();
  const { isDarkMode } = useDarkMode();

  const border = !isDarkMode ? "border" : "";

  const tradesWithFormattedDate = trades?.map((trade) => ({
    ...trade,
    date: dayjs(trade.date).format("MM/D/YYYY"),
  }));

  const userTrades = tradesWithFormattedDate?.filter(
    (trade) => trade.userId === user.id
  );

  const today = dayjs(new Date()).format("D MM YYYY");

  const todayTrades = userTrades.filter(
    (trade) => dayjs(trade.date).format("D MM YYYY") === today
  );

  if (isLoading) return <Spinner />;

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden" }}
      elevation={0}
      className={`${border} rounded-md`}
    >
      <TableContainer sx={{ maxHeight: 300, minHeight: 300 }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: isDarkMode && "solid #282c35 1px",
            },
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: isDarkMode && "#18212f",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userTrades.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
