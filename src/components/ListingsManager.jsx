import React, { useState } from "react";
import AddListing from "./AddListing";
import { BuyerBrokerTable } from "./BuyerBrokerTable";
import { Login } from "./Login";

const ListingsManager = ({ isLoggedIn, setIsLoggedIn }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleListingAdded = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <h1>Listings Manager</h1>
      {!isLoggedIn ? <></> : <AddListing onListingAdded={handleListingAdded} />}
      <BuyerBrokerTable refreshKey={refreshKey} />
    </div>
  );
};

export default ListingsManager;
