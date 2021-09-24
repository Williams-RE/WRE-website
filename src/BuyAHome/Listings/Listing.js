import React from 'react';
import './Listing.css';
import beforeYouBuyImg from '../../images/buy-a-home/before-you-buy.jpg';

function Listing({imagePath, address, price, propertyInfo, listingAgent}) {
    return (
        <div class="listing">
            <img src={beforeYouBuyImg} class="listing-image" alt="Listing"/>
            <h3>{price}</h3>
            <p>{address}</p>
            <p>{propertyInfo}</p>
            <p>Listing courtesy of {listingAgent} on SmartMLS</p>
        </div>
    )
}

export default Listing