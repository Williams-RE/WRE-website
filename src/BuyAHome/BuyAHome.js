import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './BuyAHome.css';
import ListingsLayout from './Listings/ListingsLayout.js';
import beforeYouBuy from '../images/buy-a-home/before-you-buy.jpg';
import findingTheDeal from '../images/buy-a-home/finding-the-deal.jpg';
import sealingTheDeal from '../images/buy-a-home/sealing-the-deal.jpg';
import StylizedParagraphs from '../TextFomatting/StylizedParagraphs.js';

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
                
                <button class="button" onClick={onBeforeYouBuyClick}>Before You Buy  
                <div class="button__horizontal"></div>
                <div class="button__vertical"></div>
                </button>

                <button class="button" onClick={onFindingTheDealClick}>Finding The Deal
                <div class="button__horizontal"></div>
                <div class="button__vertical"></div>
                </button>


                <button class="button" onClick={onSealingTheDealClick}>Sealing The Deal
                <div class="button__horizontal"></div>
                <div class="button__vertical"></div>
                </button>
            </div>
            





            <button class="listings-modal-button" onClick = {() => setListingsModalIsOpen(true)}> See Our Listings  </button>
            <div className="buy-a-home-content" onAnimationEnd={() => setFadeInBuyAHomeContent(0)} animation={fadeInBuyAHomeContent}>
                { showBuyAHomeParagraphBefore ? 

                <div>
                    <StylizedParagraphs passage = "Buying a home is one of the most challenging and rewarding experiences in your life.  
                    To guarantee a smooth process, contact your bank to get a preapproval letter. 
                    If you have any questions feel free to reach out to one of our qualified agents.  WRE is always here to serve you."/>
                        
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
                    <StylizedParagraphs passage = "You spotted the perfect home! Now the next step is to make the offer, and making an agreement with the seller. This is a grueling and tedious time but you do not have to worry.  Our trusted agents will guide you through the process so you will be able to lay back on your new porch and watch the sunset.     " />
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