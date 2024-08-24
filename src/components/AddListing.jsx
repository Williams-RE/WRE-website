import React, { useState } from "react";
import config from "../config.js";
import { useAgents } from "../contexts/AgentContext.js";

const AddListing = ({ onListingAdded }) => {
  const { agents, loading, error: agentsError } = useAgents();
  const [listing, setListing] = useState({
    mlsId: "",
    compensation: "",
    address: "",
    city: "",
    zip: "",
    listingBroker: "",
    phone: "",
    email: "",
  });

  const formStyles = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // Two equal columns
    gap: "20px", // Space between columns
    "@media (max-width: 768px)": {
      // Adjust layout for mobile screens
      gridTemplateColumns: "1fr", // Switch to single column for movile
      gap: "10px",
    },
  };

  const inputStyles = {
    width: "100%",
    padding: "15px",
    fontSize: "18px",
    border: "2px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  };

  const labelStyles = {
    marginBottom: "5px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
  };

  const buttonStyles = {
    gridColumn: "span 2", // Make the button span both columns
    padding: "15px 30px",
    fontSize: "20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "20px",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing((prev) => ({ ...prev, [name]: value }));

    if (name === "listingBroker") {
      const selectedAgent = agents.find((agent) => agent.name === value);
      if (selectedAgent) {
        setListing((prev) => ({
          ...prev,
          phone: selectedAgent.CellNumber,
          email: selectedAgent.Email,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${config.SERVER_URL}/api/v1/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(listing),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.info("Listing added successfully", data);
      onListingAdded();
      setListing({
        mlsId: "",
        compensation: "",
        address: "",
        city: "",
        zip: "",
        listingBroker: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error("Error adding listing:", error);
      alert("Failed to add listing. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      {/* ... (keep your other form fields as they are) */}

      <div>
        <label style={labelStyles}>Listing Broker</label>
        <select
          style={inputStyles}
          name="listingBroker"
          value={listing.listingBroker}
          onChange={handleChange}
          required
        >
          <option value="">Select an agent</option>
          {loading ? (
            <option disabled>Loading agents...</option>
          ) : (
            agents.map((agent) => (
              <option key={agent.id} value={agent.name}>
                {agent.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div>
        <label style={labelStyles}>Phone</label>
        <input
          style={inputStyles}
          name="phone"
          value={listing.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
      </div>

      <div>
        <label style={labelStyles}>Email</label>
        <input
          style={inputStyles}
          name="email"
          value={listing.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>

      <button type="submit" style={buttonStyles}>
        Add Listing
      </button>
    </form>
  );
};

export default AddListing;
