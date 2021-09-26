import React, { useState } from 'react';
import './SellAHome.css';
import beforeYouStart from '../images/sell-a-home/before-you-start.jpg';
import findingTheDeal from '../images/sell-a-home/finding-the-deal.jpg';
import sealingTheDeal from '../images/sell-a-home/sealing-the-deal.jpg';

function SellAHome() {
    const [showSellAHomeParagraphBefore, setShowSellAHomeParagraphBefore] = useState(true);
    const [showSellAHomeParagraphFinding, setShowSellAHomeParagraphFinding] = useState(false);
    const [showSellAHomeParagraphSealing, setShowSellAHomeParagraphSealing] = useState(false);
    const [fadeInSellAHomeContent, setFadeInSellAHomeContent] = useState(0);

    function onBeforeYouStartClick() {
        setFadeInSellAHomeContent(1);
        setShowSellAHomeParagraphBefore(true);
        setShowSellAHomeParagraphFinding(false);
        setShowSellAHomeParagraphSealing(false);
    }

    function onFindingTheDealClick() {
        setFadeInSellAHomeContent(1);
        setShowSellAHomeParagraphBefore(false);
        setShowSellAHomeParagraphFinding(true);
        setShowSellAHomeParagraphSealing(false);
    }

    function onSealingTheDealClick() {
        setFadeInSellAHomeContent(1);
        setShowSellAHomeParagraphBefore(false);
        setShowSellAHomeParagraphFinding(false);
        setShowSellAHomeParagraphSealing(true);
    }

    return (
        <div class="sell-a-home-main">
            <h1 class="sell-a-home-heading">Sell a Home</h1>
            <div class="sell-a-home-button-group">
                <button class="sell-a-home-button" onClick={onBeforeYouStartClick}>Before You Start</button>
                <button class="sell-a-home-button" onClick={onFindingTheDealClick}>Getting the offer</button>
                <button class="sell-a-home-button" onClick={onSealingTheDealClick}>Making The Deal</button>
            </div>
            <div className="sell-a-home-content" onAnimationEnd={() => setFadeInSellAHomeContent(0)} animation={fadeInSellAHomeContent}>
                { showSellAHomeParagraphBefore ? 
                <div>
                    <p class="sell-a-home-paragraph">
                    Selling your home is a hard decision. Years of memories of  have been etched in the tiles on    You have had years of experience  want to move or downsize, but you don't know when is the right moment. This is a daunting task but no need to fear.
                     Our agents at WRE our experts in the market and we will ensure you are informed. Now that you've made the decision to sell your house, your trusted agent will help you put your best foot forward when preparing to sell your home. Your agent can walk you through the appraisal, 
                     give you tips on staging your home, and advise you on doing renovations or making any necessary repairs 
                    </p> 
                    <img src={beforeYouStart} alt="Before You Start" class="sell-a-home-image"/> 
                </div>
                : null }

                 { showSellAHomeParagraphFinding ? 
                <div>
                    <p class="sell-a-home-paragraph">
                    You have an offer. There are multiple steps you can take, accept, counteroffer, or reject. But no need to fear as Our agents will weigh the multiple options and advice you on the best course of action.
                    </p>
                    <img src={findingTheDeal} alt="Finding The Deal" class="sell-a-home-image"/>
                </div>
                : null }
                { showSellAHomeParagraphSealing ? 
                <div>
                    <p class="sell-a-home-paragraph">
                    Congratulations! You have sold your home. The hard work and patience has paid off and you have entered  a new chapter of your life. 
                    </p>
                    <img src={sealingTheDeal} alt="Making The Deal" class="sell-a-home-image" />
                </div>
                 : null }
            </div>
            {/* <iframe src="https://smartmls.mlsmatrix.com/Matrix/public/IDX.aspx?idx=0f243f8" width="100%" height="100%" frameborder="0" marginwidth="0" marginheight="0"></iframe> */}
        </div>
    );
}

export default SellAHome;