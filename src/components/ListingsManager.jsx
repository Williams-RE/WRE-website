import { useState, useEffect } from "react";
import AddListing from "./AddListing";
import BuyerBrokerTable from "./BuyerBrokerTable";
import "./ListingsManager.css";

const ListingsManager = ({ isLoggedIn, setIsLoggedIn }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleListingAdded = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  useEffect(() => {
    // Trigger fade-in effect after the component is mounted
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={
        isLoaded ? "listings-manager-loaded" : "listings-manager-loading"
      }
      // style={{ alignSelf: "center" }}
    >
      <h1 className="page-title">Buyer Broker Commission</h1>
      {!isLoggedIn ? <></> : <AddListing onListingAdded={handleListingAdded} />}
      <p className="child-text">
        View our company’s listings with sellers offering buyer broker
        compensation in Connecticut & New York
      </p>
      <BuyerBrokerTable refreshKey={refreshKey} />
    </div>
  );
};

export default ListingsManager;
