import React, { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./BuyerBrokerTable.css";
import config from "../config";

export const BuyerBrokerTable = ({ refreshKey }) => {
  const [listings, setListings] = useState([]);
  const [editRowId, setEditRowId] = useState(null); // Track which row is being edited
  const [editListing, setEditListing] = useState({}); // Store the values of the row being edited

  useEffect(() => {
    fetchListings();
  }, [refreshKey]); // Re-fetch listings when refreshKey changes

  const columnHelper = createColumnHelper();

  // Fetch listings from the backend
  const fetchListings = async () => {
    try {
      const response = await fetch(`${config.SERVER_URL}/api/v1/listings`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  // Handle the click of the Edit button
  const handleEditClick = (row) => {
    setEditRowId(row.original._id); // Set the row ID to be edited (MongoDB _id)
    setEditListing({ ...row.original }); // Store the original row data in editListing state
  };

  // Handle input change in the edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditListing((prev) => ({ ...prev, [name]: value }));
  };

  // Handle the click of the Save button
  const handleSaveClick = async (listingId, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${config.SERVER_URL}/api/v1/listings/${listingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.info("Listing updated successfully", data);
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  // Define table columns
  const columns = [
    columnHelper.accessor("mlsId", {
      header: "MLS ID",
      cell: (info) =>
        editRowId === info.row.original._id ? (
          <input
            name="mlsId"
            value={editListing.mlsId || ""}
            onChange={handleInputChange}
          />
        ) : (
          info.getValue()
        ),
    }),
    columnHelper.accessor("compensation", {
      header: "Compensation",
      cell: (info) =>
        editRowId === info.row.original._id ? (
          <input
            name="compensation"
            value={editListing.compensation || ""}
            onChange={handleInputChange}
          />
        ) : (
          `${parseFloat(info.getValue()).toFixed(1)}%`
        ),
    }),
    columnHelper.accessor("address", {
      header: "Address",
      cell: (info) =>
        editRowId === info.row.original._id ? (
          <input
            name="address"
            value={editListing.address || ""}
            onChange={handleInputChange}
          />
        ) : (
          info.getValue()
        ),
    }),
    columnHelper.accessor("city", {
      header: "City/Town",
      cell: (info) =>
        editRowId === info.row.original._id ? (
          <input
            name="city"
            value={editListing.city || ""}
            onChange={handleInputChange}
          />
        ) : (
          info.getValue()
        ),
    }),
    columnHelper.accessor("zip", {
      header: "Zip",
      cell: (info) =>
        editRowId === info.row.original._id ? (
          <input
            name="zip"
            value={editListing.zip || ""}
            onChange={handleInputChange}
          />
        ) : (
          info.getValue()
        ),
    }),
    columnHelper.accessor("listingBroker", {
      header: "Listing Broker",
      cell: (info) =>
        editRowId === info.row.original._id ? (
          <input
            name="listingBroker"
            value={editListing.listingBroker || ""}
            onChange={handleInputChange}
          />
        ) : (
          info.getValue()
        ),
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) =>
        editRowId === info.row.original._id ? (
          <input
            name="phone"
            value={editListing.phone || ""}
            onChange={handleInputChange}
          />
        ) : (
          info.getValue()
        ),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) =>
        editRowId === info.row.original._id ? (
          <input
            name="email"
            value={editListing.email || ""}
            onChange={handleInputChange}
          />
        ) : (
          info.getValue()
        ),
    }),
    {
      header: "Actions",
      cell: (info) =>
        editRowId === info.row.original._id ? (
          <>
            <button
              className="button"
              onClick={() =>
                handleSaveClick(info.row.original._id, editListing)
              }
            >
              Save
            </button>
            <button
              className="button cancel"
              onClick={() => setEditRowId(null)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button className="button" onClick={() => handleEditClick(info.row)}>
            Edit
          </button>
        ),
    },
  ];

  // Create the table instance
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
