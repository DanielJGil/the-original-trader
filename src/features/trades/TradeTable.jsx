import { useQuery } from "@tanstack/react-query";
import { getTrades } from "../../services/apiTrades";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "date", headerName: "Date", width: 170 },
  { field: "type", headerName: "Type", width: 170 },
  { field: "pair", headerName: "Pair", width: 170 },
  {
    field: "outcome",
    headerName: "Outcome",
    width: 170,
  },
  {
    field: "profit",
    headerName: "Profit",
    type: "number",
    // sortable: false,
    width: 170,
  },
];

export default function DataTable() {
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
        rows={trades}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
