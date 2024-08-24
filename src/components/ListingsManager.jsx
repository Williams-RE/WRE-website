import React, { useState } from "react";
import AddListing from "./AddListing";
import { BuyerBrokerTable } from "./BuyerBrokerTable";

const ListingsManager = ({ isLoggedIn, setIsLoggedIn }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleListingAdded = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <div style={{ marginTop: "60px" }}>
      <h1 style={{ fontSize: "2.7vw" }}>Buyer Broker Compensation</h1>
      {!isLoggedIn ? <></> : <AddListing onListingAdded={handleListingAdded} />}
      <BuyerBrokerTable refreshKey={refreshKey} />
    </div>
  );
};

export default ListingsManager;
