import React from "react";
import "./ListingsLayout.css";
import config from "../config.js";
import Listing from "./Listing.jsx";

function ListingsLayout({ listings }) {
  const listingsArray = [];
  Object.keys(listings).forEach((listing) => {
    listingsArray.push(listings[listing]);
  });
  return (
    <div className="listings-layout">
      {listingsArray.map((listing) => {
        return (
          <Listing
            imagePath={
              config.SERVER_URL +
              "listingImages/" +
              listing["Matrix_Unique_ID"] +
              ".jpg"
            }
            address={listing["Address"]}
            price={listing["Price"]}
            propertyInfo={listing["PropertyInfo"]}
            listingAgent={listing["ListAgentFullName"]}
          />
        );
      })}
    </div>
  );
}

export default ListingsLayout;
