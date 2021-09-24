import React from 'react';
import './ListingsLayout.css';
import Listing from './Listing.js';

function ListingsLayout({listings}) {
    const listingsArray = [];
    Object.keys(listings).forEach((listing) => {
        listingsArray.push(listings[listing]);
    })
    return (
        <div class="listings-layout">
            {listingsArray.map(listing => {
                return (<Listing imagePath="" address={listing['Address']} price={listing['Price']}
                    propertyInfo = {listing['PropertyInfo']} listingAgent={listing['ListAgentFullName']}/>);
            })}
            {/* <Listing imagePath="" address={listingsArray[0]['Address']} price={listingsArray[0]['Price']} 
                propertyInfo={listingsArray[0]['PropertyInfo']} listingAgent={listingsArray[0]['ListAgentFillName']} />
            <Listing imagePath="" address={listingsArray[0]['Address']} price={listingsArray[0]['Price']} 
                propertyInfo={listingsArray[0]['PropertyInfo']} listingAgent={listingsArray[0]['ListAgentFillName']} /> */}
            {/* <p>Test</p> */}
        </div>
    )
}

export default ListingsLayout