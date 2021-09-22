import React, { useState } from 'react';
import './BuyAHome.css';
import beforeYouBuy from '../images/buy-a-home/before-you-buy.jpg';
import findingTheDeal from '../images/buy-a-home/finding-the-deal.jpg';
import sealingTheDeal from '../images/buy-a-home/sealing-the-deal.jpg';
import StylizedParagraphs from '../TextFomatting/StylizedParagraphs.js';

function BuyAHome() {
    const [showBuyAHomeParagraphBefore, setShowBuyAHomeParagraphBefore] = useState(true);
    const [showBuyAHomeParagraphFinding, setShowBuyAHomeParagraphFinding] = useState(false);
    const [showBuyAHomeParagraphSealing, setShowBuyAHomeParagraphSealing] = useState(false);
    const [fadeInBuyAHomeContent, setFadeInBuyAHomeContent] = useState(0);

    function onBeforeYouBuyClick() {
        setFadeInBuyAHomeContent(1);
        setShowBuyAHomeParagraphBefore(true);
        setShowBuyAHomeParagraphFinding(false);
        setShowBuyAHomeParagraphSealing(false);
    }

    function onFindingTheDealClick() {
        setFadeInBuyAHomeContent(1);
        setShowBuyAHomeParagraphBefore(false);
        setShowBuyAHomeParagraphFinding(true);
        setShowBuyAHomeParagraphSealing(false);
    }

    function onSealingTheDealClick() {
        setFadeInBuyAHomeContent(1);
        setShowBuyAHomeParagraphBefore(false);
        setShowBuyAHomeParagraphFinding(false);
        setShowBuyAHomeParagraphSealing(true);
    }

    return (
        <div class="buy-a-home-main">
            <h1 class="buy-a-home-heading">Buy a Home</h1>
            <div class="buy-a-home-button-group">
                <button class="buy-a-home-button" onClick={onBeforeYouBuyClick}>Before You Buy</button>
                <button class="buy-a-home-button" onClick={onFindingTheDealClick}>Finding The Deal</button>
                <button class="buy-a-home-button" onClick={onSealingTheDealClick}>Sealing The Deal</button>
            </div>
            <div className="buy-a-home-content" onAnimationEnd={() => setFadeInBuyAHomeContent(0)} animation={fadeInBuyAHomeContent}>
                { showBuyAHomeParagraphBefore ? 

                <div>
                    <StylizedParagraphs passage = "Buying a home is one of the most challenging and rewarding experiences in your life.  
                    To guarantee a smooth process, contact your bank to get a prapproval letter. 
                    If you have any questions feel free to reach out to one of our qualified agents.  WRE is always here to serve you." />
                        
                    <img src={beforeYouBuy} alt="Before You Buy" class="buy-a-home-image"/> 
                </div>
                : null }

                { showBuyAHomeParagraphFinding ? 
                <div>
                    <StylizedParagraphs passage = "Finding the right home is as much as an art as it is a science. The first step is figure out what you want vs what you need in a home. When house hunting you should consider other factors beyond the price and style. How many bedrooms?  How is the neighborhood and how are the schools? Our agents at WRE are best in understanding your budget, tastes, and lifestyles. We will make sure you find the right home. " />
                    
            
                    <img src={findingTheDeal} alt="Finding The Deal" class="buy-a-home-image"/>
                </div>
                : null }
                { showBuyAHomeParagraphSealing ? 
                <div>
                    <p class="buy-a-home-paragraph">
                    
                    </p>
                    <img src={sealingTheDeal} alt="Sealing The Deal" class="buy-a-home-image" />
                </div>
                 : null }
            </div>
            {/* <iframe src="https://smartmls.mlsmatrix.com/Matrix/public/IDX.aspx?idx=0f243f8" width="100%" height="100%" frameborder="0" marginwidth="0" marginheight="0"></iframe> */}
        </div>
    );
}

export default BuyAHome;