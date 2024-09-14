import { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./BuyerBrokerTable.css";
import { capitalizeFirstLetter, isMobile } from "../lib/utils";
import config from "../config";

const BuyerBrokerTable = ({ refreshKey }) => {
  const [listings, setListings] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editListing, setEditListing] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Check if user is logged in by verifying the token in local storage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // If token exists, user is logged in
    fetchListings();
    setIsMobileDevice(isMobile());
  }, [refreshKey]);

  const columnHelper = createColumnHelper();

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

  const handleEditClick = (row) => {
    setEditRowId(row.original._id);
    setEditListing({ ...row.original });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditListing((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async (listingId) => {
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
          body: JSON.stringify(editListing),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.info("Listing updated successfully", data);
      setEditRowId(null);
      fetchListings(); // Refresh the listings after saving
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  const handleDeleteClick = async (listingId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${config.SERVER_URL}/api/v1/listings/${listingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.info("Listing deleted successfully", data);
      fetchListings(); // Refresh the listings after deletion
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

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
          capitalizeFirstLetter(info.getValue())
        ),
    }),
    columnHelper.accessor("compensation", {
      header: "Fees",
      cell: (info) =>
        editRowId === info.row.original._id ? (
          <input
            name="compensation"
            value={editListing.fees || ""}
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
          capitalizeFirstLetter(info.getValue())
        ),
    }),
    columnHelper.accessor("city", {
      header: "City",
      cell: (info) =>
        editRowId === info.row.original._id ? (
          <input
            name="city"
            value={editListing.city || ""}
            onChange={handleInputChange}
          />
        ) : (
          capitalizeFirstLetter(info.getValue())
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
      header: "Agent",
      cell: (info) =>
        editRowId === info.row.original._id ? (
          <input
            name="listingBroker"
            value={editListing.listingBroker || ""}
            onChange={handleInputChange}
          />
        ) : (
          capitalizeFirstLetter(info.getValue())
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
    ...(isMobileDevice
      ? []
      : [
          columnHelper.accessor("email", {
            header: "Email",
            cell: (info) =>
              editRowId === info.row.original._id ? (
                <input
                  name="email"
                  value={editListing.email || ""}
                  onChange={handleInputChange}
                  className="email-column"
                />
              ) : (
                info.getValue()
              ),
          }),
        ]),
    // Conditionally render the Actions column only if the user is logged in
    ...(isLoggedIn
      ? [
          {
            header: "Actions",
            cell: (info) =>
              editRowId === info.row.original._id ? (
                <>
                  <button
                    className="button"
                    onClick={() => handleSaveClick(info.row.original._id)}
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
                <>
                  <button
                    className="button"
                    onClick={() => handleEditClick(info.row)}
                  >
                    Edit
                  </button>
                  <button
                    className="button delete"
                    onClick={() => handleDeleteClick(info.row.original._id)}
                    data-testid={`delete-button-${info.row.original.mlsId}`}
                  >
                    Delete
                  </button>
                </>
              ),
          },
        ]
      : []),
  ];

  const table = useReactTable({
    data: listings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container">
      <table className="buyer-broker-table" data-testid="buyer-broker-table">
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
            <tr key={row.id} data-testid={`table-row-${row.original.mlsId}`}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="table-cell"
                  data-label={cell.column.columnDef.header} // Add data-label to use as a label on mobile
                >
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

export default BuyerBrokerTable;
