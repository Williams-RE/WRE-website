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
                <button class="sell-a-home-button" onClick={onFindingTheDealClick}>Finding The Deal</button>
                <button class="sell-a-home-button" onClick={onSealingTheDealClick}>Sealing The Deal</button>
            </div>
            <div className="sell-a-home-content" onAnimationEnd={() => setFadeInSellAHomeContent(0)} animation={fadeInSellAHomeContent}>
                { showSellAHomeParagraphBefore ? 
                <div>
                    <p class="sell-a-home-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque arcu, ultrices sit amet ullamcorper a, luctus ut ante. Duis ullamcorper non elit at euismod. Duis posuere nec justo sit amet vestibulum. 
                    Sed ex odio, molestie non faucibus vitae, consequat ut quam. Vestibulum porttitor metus a diam viverra, quis blandit tellus condimentum. In laoreet, justo id eleifend dictum, augue risus blandit orci, vel finibus ligula massa a sapien. 
                    Aliquam ullamcorper facilisis malesuada. Nam ullamcorper fermentum ipsum sed dictum. Quisque tincidunt commodo orci vitae rhoncus. Suspendisse fermentum magna et tempus porta. Vivamus blandit mi enim, sit amet pretium sem varius in. 
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent id volutpat elit, in tristique mauris. Maecenas purus magna, ornare quis mauris ornare, aliquam sollicitudin tellus. Fusce sollicitudin aliquet commodo.
                    </p> 
                    <img src={beforeYouStart} alt="Before You Start" class="sell-a-home-image"/> 
                </div>
                : null }

                { showSellAHomeParagraphFinding ? 
                <div>
                    <p class="sell-a-home-paragraph">
                    Sed neque arcu, ultrices sit amet ullamcorper a, luctus ut ante. Duis ullamcorper non elit at euismod. Duis posuere nec justo sit amet vestibulum. 
                    Sed ex odio, molestie non faucibus vitae, consequat ut quam. Vestibulum porttitor metus a diam viverra, quis blandit tellus condimentum. In laoreet, justo id eleifend dictum, augue risus blandit orci, vel finibus ligula massa a sapien. 
                    Aliquam ullamcorper facilisis malesuada. Nam ullamcorper fermentum ipsum sed dictum. Quisque tincidunt commodo orci vitae rhoncus. Suspendisse fermentum magna et tempus porta. Vivamus blandit mi enim, sit amet pretium sem varius in. 
                    </p>
                    <img src={findingTheDeal} alt="Finding The Deal" class="sell-a-home-image"/>
                </div>
                : null }
                { showSellAHomeParagraphSealing ? 
                <div>
                    <p class="sell-a-home-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque arcu, ultrices sit amet ullamcorper a, luctus ut ante. Duis ullamcorper non elit at euismod. Duis posuere nec justo sit amet vestibulum. 
                    Sed ex odio, molestie non faucibus vitae, consequat ut quam. Vestibulum porttitor metus a diam viverra, quis blandit tellus condimentum. In laoreet, justo id eleifend dictum, augue risus blandit orci, vel finibus ligula massa a sapien. 
                    Quisque tincidunt commodo orci vitae rhoncus. Suspendisse fermentum magna et tempus porta. Vivamus blandit mi enim, sit amet pretium sem varius in. 
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent id volutpat elit, in tristique mauris. Maecenas purus magna, ornare quis mauris ornare, aliquam sollicitudin tellus. Fusce sollicitudin aliquet commodo.
                    </p>
                    <img src={sealingTheDeal} alt="Sealing The Deal" class="sell-a-home-image" />
                </div>
                 : null }
            </div>
            {/* <iframe src="https://smartmls.mlsmatrix.com/Matrix/public/IDX.aspx?idx=0f243f8" width="100%" height="100%" frameborder="0" marginwidth="0" marginheight="0"></iframe> */}
        </div>
    );
}

export default SellAHome;