import React from "react";
import "./Listing.css";
import config from "../config";

function Listing({ imagePath, address, price, propertyInfo, listingAgent }) {
  return (
    <div className="listing">
      <div className="listing-image-container">
        <img
          src={imagePath}
          onError={(error) =>
            (error.target.src =
              config.SERVER_URL + "listingImages/image-not-available.jpg")
          }
          className="listing-image"
          alt="Listing"
        />
      </div>
      <div className="listing-content">
        <h3 className="listing-price">{price}</h3>
        <p>{address}</p>
        <p>{propertyInfo}</p>
        <p className="listing-agent-mls">
          Courtesy of {listingAgent} on SmartMLS
        </p>
      </div>
    </div>
  );
}

export default Listing;
