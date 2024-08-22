import React, { useState, useEffect } from "react";
import config from "../config.js";

const AddListing = ({ onListingAdded }) => {
  const [agents, setAgents] = useState({});
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

  useEffect(() => {
    fetchAgents();
  }, []);

  const formStyles = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  };

  const inputStyles = {
    width: "50%",
    padding: "15px",
    marginBottom: "20px",
    fontSize: "18px",
    border: "2px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  };

  const labelStyles = {
    display: "block",
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "white",
  };

  const buttonStyles = {
    padding: "15px 30px",
    fontSize: "20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5%",
    cursor: "pointer",
    width: "50%",
  };

  const fetchAgents = async () => {
    try {
      const response = await fetch(`${config.SERVER_URL}/get-agents`);
      if (response.ok) {
        const data = await response.json();
        setAgents(data);
      } else {
        console.error("Failed to fetch agents");
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing((prev) => ({ ...prev, [name]: value }));

    if (name === "listingBroker") {
      const selectedAgent = agents[value];
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
      const response = await fetch(`${config.SERVER_URL}/api/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(listing),
      });

      if (response.ok) {
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
      } else {
        throw new Error("Failed to add listing");
      }
    } catch (error) {
      console.error("Error adding listing:", error);
      alert("Failed to add listing. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <label style={labelStyles}>MLS ID</label>
      <input
        style={inputStyles}
        name="mlsId"
        value={listing.mlsId}
        onChange={handleChange}
        placeholder="MLS ID"
        required
      />

      <label style={labelStyles}>Compensation %</label>
      <input
        style={inputStyles}
        name="compensation"
        value={listing.compensation}
        onChange={handleChange}
        placeholder="Compensation %"
        required
      />

      <label style={labelStyles}>Address</label>
      <input
        style={inputStyles}
        name="address"
        value={listing.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />

      <label style={labelStyles}>City/Town</label>
      <input
        style={inputStyles}
        name="city"
        value={listing.city}
        onChange={handleChange}
        placeholder="City/Town"
        required
      />

      <label style={labelStyles}>ZIP</label>
      <input
        style={inputStyles}
        name="zip"
        value={listing.zip}
        onChange={handleChange}
        placeholder="ZIP"
        required
      />

      <label style={labelStyles}>Listing Broker</label>
      <select
        style={inputStyles}
        name="listingBroker"
        value={listing.listingBroker}
        onChange={handleChange}
        required
      >
        <option value="">Select Listing Broker</option>
        {Object.keys(agents).map((agentName) => (
          <option key={agentName} value={agentName}>
            {agentName}
          </option>
        ))}
      </select>

      <label style={labelStyles}>Phone</label>
      <input
        style={inputStyles}
        name="phone"
        value={listing.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />

      <label style={labelStyles}>Email</label>
      <input
        style={inputStyles}
        name="email"
        value={listing.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      {/* Add some vertical space before the button */}
      <div style={{ marginTop: "20px" }}></div>

      {/* Move the button here, at the end of the form */}
      <button type="submit" style={{ ...buttonStyles, marginTop: "20px" }}>
        Add Listing
      </button>
    </form>
  );
};

export default AddListing;
