"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Product Name", flex: 1 }, // Use flex to fill available space
  {
    field: "price",
    headerName: "Price",
    type: "number",
    flex: 1,
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    type: "number",
    flex: 1,
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    flex: 1, // Use flex with smaller value for proportional sizing
    type: "number",
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <div className="mx-auto mt-5 w-full"> {/* Added w-full to container */}
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row.productId}
          checkboxSelection
          autoHeight
          className="bg-white shadow rounded-lg border border-gray-200 !text-gray-700"
          sx={{
            '& .MuiDataGrid-main': {
              width: '100%'
            }
          }}
        />
      </div>
    </div>
  );
};

export default Inventory;