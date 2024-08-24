import React, { useState } from "react";
import config from "../config.js";
import { useAgents } from "../contexts/AgentContext.js";
import toast, { Toaster } from "react-hot-toast";
import {
  validateMlsId,
  validateAddress,
  validateCity,
  validateCompensation,
  validateEmail,
  validateListingBroker,
  validatePhone,
  validateZip,
} from "../lib/utils.js";

const AddListing = ({ onListingAdded }) => {
  const { agents, loading, error: agentsError } = useAgents();
  const [errors, setErrors] = useState({});

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
  const errorStyle = {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
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
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "listingBroker") {
      const selectedAgent = Object.values(agents).find(
        (agent) => agent.Name === value,
      );
      if (selectedAgent) {
        setListing((prev) => ({
          ...prev,
          phone: selectedAgent.CellNumber,
          email: selectedAgent.Email,
        }));
        setErrors((prev) => ({ ...prev, phone: "", email: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateMlsId(listing.mlsId))
      newErrors.mlsId = "Valid MLS ID is required.";
    if (!validateCompensation(listing.compensation))
      newErrors.compensation =
        "Compensation must be a number between 0 and 100.";
    if (!validateAddress(listing.address))
      newErrors.address = "Address is required.";
    if (!validateCity(listing.city)) newErrors.city = "City is required.";
    if (!validateZip(listing.zip))
      newErrors.zip = "Valid ZIP code is required.";
    if (!validateListingBroker(listing.listingBroker))
      newErrors.listingBroker = "Listing broker is required.";
    if (!validatePhone(listing.phone))
      newErrors.phone = "Valid phone number is required.";
    if (!validateEmail(listing.email))
      newErrors.email = "Valid email is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log("newErrors are ", newErrors);
      toast.error("Please correct the errors in the form.");
      return;
    }

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
      setErrors({});
      toast.success("Listing added successfully!");
    } catch (error) {
      console.error("Error adding listing:", error);
      toast.error("Failed to add listing. Please try again.");
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <form onSubmit={handleSubmit} style={formStyles}>
        <div>
          <label style={labelStyles}>MLS ID</label>
          <input
            style={inputStyles}
            name="mlsId"
            value={listing.mlsId}
            onChange={handleChange}
            placeholder="MLS ID"
            required
          />
          {errors.mlsId && <p style={errorStyle}>{errors.mlsId}</p>}
        </div>

        <div>
          <label style={labelStyles}>Compensation %</label>
          <input
            style={inputStyles}
            name="compensation"
            value={listing.compensation}
            onChange={handleChange}
            placeholder="Compensation %"
            required
          />
          {errors.compensation && (
            <p style={errorStyle}>{errors.compensation}</p>
          )}
        </div>

        <div>
          <label style={labelStyles}>Address</label>
          <input
            style={inputStyles}
            name="address"
            value={listing.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          {errors.address && <p style={errorStyle}>{errors.address}</p>}
        </div>

        <div>
          <label style={labelStyles}>City/Town</label>
          <input
            style={inputStyles}
            name="city"
            value={listing.city}
            onChange={handleChange}
            placeholder="City/Town"
            required
          />
          {errors.city && <p style={errorStyle}>{errors.city}</p>}
        </div>
        <div>
          <label style={labelStyles}>ZIP</label>
          <input
            style={inputStyles}
            name="zip"
            value={listing.zip}
            onChange={handleChange}
            placeholder="ZIP"
            required
          />
          {errors.zip && <p style={errorStyle}>{errors.zip}</p>}
        </div>

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
              Object.values(agents).map((agent) => (
                <option key={agent.MATRIX_UNIQUE_ID} value={agent.Name}>
                  {agent.Name}
                </option>
              ))
            )}
          </select>
          {errors.listingBroker && (
            <p style={errorStyle}>{errors.listingBroker}</p>
          )}
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
          {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
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
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        <button type="submit" style={buttonStyles}>
          Add Listing
        </button>
      </form>
    </>
  );
};

export default AddListing;
