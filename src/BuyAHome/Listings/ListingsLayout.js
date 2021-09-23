import React from 'react';
import './ListingsLayout.css';

function ListingsLayout(listings) {
    const listingsArray = [];
    Object.keys(listings['listings']).forEach((listing) => {
        listingsArray.push(listings['listings'][listing]);
        // console.log(listings);
    })
    // console.log(listingsArray);
    return (
        <div>
            {listingsArray.map(listing => {
                return (<p>{listing['StreetNumber']}</p>);
            })}
            {/* <p>18</p> */}
        </div>
    )
}

export default ListingsLayout