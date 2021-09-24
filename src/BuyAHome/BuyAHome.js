import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './BuyAHome.css';
import ListingsLayout from './Listings/ListingsLayout.js';
import beforeYouBuy from '../images/buy-a-home/before-you-buy.jpg';
import findingTheDeal from '../images/buy-a-home/finding-the-deal.jpg';
import sealingTheDeal from '../images/buy-a-home/sealing-the-deal.jpg';

Modal.setAppElement('#root')

function BuyAHome() {
    const [showBuyAHomeParagraphBefore, setShowBuyAHomeParagraphBefore] = useState(true)
    const [showBuyAHomeParagraphFinding, setShowBuyAHomeParagraphFinding] = useState(false)
    const [showBuyAHomeParagraphSealing, setShowBuyAHomeParagraphSealing] = useState(false)
    const [fadeInBuyAHomeContent, setFadeInBuyAHomeContent] = useState(0)
    const [listings, setListings] = useState({})
    const [listingsModalIsOpen, setListingsModalIsOpen] = useState(false)

    useEffect(() => {
        getListings()
    }, [])

    function onBeforeYouBuyClick() {
        setFadeInBuyAHomeContent(1)
        setShowBuyAHomeParagraphBefore(true)
        setShowBuyAHomeParagraphFinding(false)
        setShowBuyAHomeParagraphSealing(false)
    }

    function onFindingTheDealClick() {
        setFadeInBuyAHomeContent(1)
        setShowBuyAHomeParagraphBefore(false)
        setShowBuyAHomeParagraphFinding(true)
        setShowBuyAHomeParagraphSealing(false)
    }

    function onSealingTheDealClick() {
        setFadeInBuyAHomeContent(1)
        setShowBuyAHomeParagraphBefore(false)
        setShowBuyAHomeParagraphFinding(false)
        setShowBuyAHomeParagraphSealing(true)
    }

    async function getListings() {
        const response = await axios.get('http://localhost:3001/get-listings', 
        {
            headers: { 'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'}
        })
        setListings(response.data)
    }

    

    return (
        <div class="buy-a-home-main">
            <h1 class="buy-a-home-heading">Buy a Home</h1>
            <div class="buy-a-home-button-group">
                <button class="buy-a-home-button" onClick={onBeforeYouBuyClick}>Before You Buy</button>
                <button class="buy-a-home-button" onClick={onFindingTheDealClick}>Finding The Deal</button>
                <button class="buy-a-home-button" onClick={onSealingTheDealClick}>Sealing The Deal</button>
            </div>
            <button class="listings-modal-button" onClick = {() => setListingsModalIsOpen(true)}> See Our Listings  </button>
            <div className="buy-a-home-content" onAnimationEnd={() => setFadeInBuyAHomeContent(0)} animation={fadeInBuyAHomeContent}>
                { showBuyAHomeParagraphBefore ? 
                <div>
                    <p class="buy-a-home-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque arcu, ultrices sit amet ullamcorper a, luctus ut ante. Duis ullamcorper non elit at euismod. Duis posuere nec justo sit amet vestibulum. 
                    Sed ex odio, molestie non faucibus vitae, consequat ut quam. Vestibulum porttitor metus a diam viverra, quis blandit tellus condimentum. In laoreet, justo id eleifend dictum, augue risus blandit orci, vel finibus ligula massa a sapien. 
                    Aliquam ullamcorper facilisis malesuada. Nam ullamcorper fermentum ipsum sed dictum. Quisque tincidunt commodo orci vitae rhoncus. Suspendisse fermentum magna et tempus porta. Vivamus blandit mi enim, sit amet pretium sem varius in. 
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent id volutpat elit, in tristique mauris. Maecenas purus magna, ornare quis mauris ornare, aliquam sollicitudin tellus. Fusce sollicitudin aliquet commodo.
                    </p> 
                    <img src={beforeYouBuy} alt="Before You Buy" class="buy-a-home-image"/> 
                </div>
                : null }

                { showBuyAHomeParagraphFinding ? 
                <div>
                    <p class="buy-a-home-paragraph">
                    Sed neque arcu, ultrices sit amet ullamcorper a, luctus ut ante. Duis ullamcorper non elit at euismod. Duis posuere nec justo sit amet vestibulum. 
                    Sed ex odio, molestie non faucibus vitae, consequat ut quam. Vestibulum porttitor metus a diam viverra, quis blandit tellus condimentum. In laoreet, justo id eleifend dictum, augue risus blandit orci, vel finibus ligula massa a sapien. 
                    Aliquam ullamcorper facilisis malesuada. Nam ullamcorper fermentum ipsum sed dictum. Quisque tincidunt commodo orci vitae rhoncus. Suspendisse fermentum magna et tempus porta. Vivamus blandit mi enim, sit amet pretium sem varius in. 
                    </p>
                    <img src={findingTheDeal} alt="Finding The Deal" class="buy-a-home-image"/>
                </div>
                : null }
                { showBuyAHomeParagraphSealing ? 
                <div>
                    <p class="buy-a-home-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque arcu, ultrices sit amet ullamcorper a, luctus ut ante. Duis ullamcorper non elit at euismod. Duis posuere nec justo sit amet vestibulum. 
                    Sed ex odio, molestie non faucibus vitae, consequat ut quam. Vestibulum porttitor metus a diam viverra, quis blandit tellus condimentum. In laoreet, justo id eleifend dictum, augue risus blandit orci, vel finibus ligula massa a sapien. 
                    Quisque tincidunt commodo orci vitae rhoncus. Suspendisse fermentum magna et tempus porta. Vivamus blandit mi enim, sit amet pretium sem varius in. 
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent id volutpat elit, in tristique mauris. Maecenas purus magna, ornare quis mauris ornare, aliquam sollicitudin tellus. Fusce sollicitudin aliquet commodo.
                    </p>
                    <img src={sealingTheDeal} alt="Sealing The Deal" class="buy-a-home-image" />
                </div>
                 : null }
            </div>
            <Modal className = "modal" isOpen = {listingsModalIsOpen} onRequestClose={() => setListingsModalIsOpen(false)}  
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: 1
                    },
                    content: {
                        position: 'absolute',
                        top: '10%',
                        left: '5%',
                        right: '5%',
                        bottom: '10%',
                        border: '1px solid #ccc',
                        background: 'white',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        // padding: '1.5071590052750565vh',
                        radius: '1px',
                        zIndex: 1
                    }
                }}
            >
                <ListingsLayout listings={listings}/>
            </Modal>
        </div>
    );
}

export default BuyAHome;