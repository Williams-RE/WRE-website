import React from 'react';
import './StylizedParagraphs.css'

function StylizedParagraphs({passage}) {  

    const [dropCap, theRest] = [passage[0], passage.slice(1)]; 

    return (
        <p class='paragraph'>
            <br/> 
            <span class="first-character"> {dropCap} </span>
            {theRest}
        </p>
    )

}

export default StylizedParagraphs;
