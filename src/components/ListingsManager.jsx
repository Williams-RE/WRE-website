import React, { useState } from "react";
import AddListing from "./AddListing";
import { BuyerBrokerTable } from "./BuyerBrokerTable";
import "./ListingsManager.css";

const ListingsManager = ({ isLoggedIn, setIsLoggedIn }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleListingAdded = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <div>
      <h1 className="page-title">Buyer Broker Compensation</h1>
      {!isLoggedIn ? <></> : <AddListing onListingAdded={handleListingAdded} />}
      <BuyerBrokerTable refreshKey={refreshKey} />
    </div>
  );
};

export default ListingsManager;
