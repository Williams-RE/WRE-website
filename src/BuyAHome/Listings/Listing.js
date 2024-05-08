import React from "react";
import "./Listing.css";
import config from "../../config.js";
import beforeYouBuyImg from "../../images/buy-a-home/before-you-buy.jpg";

function Listing({ imagePath, address, price, propertyInfo, listingAgent }) {
  return (
    <div class="listing">
      <div class="listing-image-container">
        <img
          src={imagePath}
          onError={(error) =>
            (error.target.src =
              config.SERVER_URL + "listingImages/image-not-available.jpg")
          }
          class="listing-image"
          alt="Listing"
        />
      </div>
      <div class="listing-content">
        <h3 class="listing-price">{price}</h3>
        <p>{address}</p>
        <p>{propertyInfo}</p>
        <p class="listing-agent-mls">Courtesy of {listingAgent} on SmartMLS</p>
      </div>
    </div>
  );
}

export default Listing;
