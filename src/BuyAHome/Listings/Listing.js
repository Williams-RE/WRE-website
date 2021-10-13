import React from 'react';
import './Listing.css';
import config from '../../config.json';
import beforeYouBuyImg from '../../images/buy-a-home/before-you-buy.jpg';

function Listing({imagePath, address, price, propertyInfo, listingAgent}) {
    return (
        <div class="listing">
            <div class="listing-image-container">
                <img src={imagePath} onError={error => error.target.src=config.SERVER_URL + 'listingImages/image-not-available.jpg'} class="listing-image" alt="Listing"/>
            </div>
            <h3>{price}</h3>
            <p>{address}</p>
            <p>{propertyInfo}</p>
            <p>Listing courtesy of {listingAgent} on SmartMLS</p>
        </div>
    )
}

export default Listing