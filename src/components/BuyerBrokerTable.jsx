import React, { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./BuyerBrokerTable.css";
import config from "../config";

// Fake data generator
const generateFakeData = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `MLS${1000 + index}`,
    compensation: (2 + Math.random() * 1).toFixed(2),
    address: `${1000 + index} Main St`,
    city: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][
      Math.floor(Math.random() * 5)
    ],
    zipCode: Math.floor(10000 + Math.random() * 90000).toString(),
    listingBroker: `Broker ${index + 1}`,
    phone: `(${Math.floor(100 + Math.random() * 900)}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
    email: `broker${index + 1}@example.com`,
  }));
};

export const BuyerBrokerTable = ({ refreshKey }) => {
  const [listings, setListings] = useState([]);
  console.log("refreshKey", refreshKey);

  useEffect(() => {
    fetchListings();
  }, [refreshKey]); // Re-fetch listings when refreshKey changes

  const columnHelper = createColumnHelper();

  const fetchListings = async () => {
    try {
      console.log(config.SERVER_URL);
      const response = await fetch(`${config.SERVER_URL}/api/listings`);
      if (response.ok) {
        const data = await response.json();
        setListings(data);
      } else {
        console.error("Failed to fetch listings");
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const columns = [
    columnHelper.accessor("mlsId", {
      header: "MLS ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("compensation", {
      header: "Compensation",
      cell: (info) => `${parseFloat(info.getValue()).toFixed(1)}%`,
    }),
    columnHelper.accessor("address", {
      header: "Address",
    }),
    columnHelper.accessor("city", {
      header: "City/Town",
    }),
    columnHelper.accessor("zip", {
      header: "Zip",
    }),
    columnHelper.accessor("listingBroker", {
      header: "Listing Broker",
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
  ];

  const table = useReactTable({
    data: listings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container">
      <table className="buyer-broker-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="table-header">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="table-cell">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer-space"></div>
    </div>
  );
};
