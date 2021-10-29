import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './BuyAHome.css';
import config from '../config.json';
import ListingsLayout from './Listings/ListingsLayout.js';
import beforeYouBuy from '../images/buy-a-home/illustrations/update1-03.png';
import findingTheDeal from '../images/buy-a-home/illustrations/update2-02.png';
import sealingTheDeal from '../images/buy-a-home/illustrations/update3-03.png';
import closeModalImg from '../images/close-modal.jpg';
import StylizedParagraphs from '../TextFomatting/StylizedParagraphs.js';

Modal.setAppElement('#root')

function BuyAHome() {
    const [showBuyAHomeParagraphBefore, setShowBuyAHomeParagraphBefore] = useState(true)
    const [showBuyAHomeParagraphFinding, setShowBuyAHomeParagraphFinding] = useState(false)
    const [showBuyAHomeParagraphSealing, setShowBuyAHomeParagraphSealing] = useState(false)
    const [fadeInBuyAHomeContent, setFadeInBuyAHomeContent] = useState(0)
    const [listings, setListings] = useState({})
    const [listingsModalIsOpen, setListingsModalIsOpen] = useState(false)
    const [scrollTop, setScrollTop] = useState(0)

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
        const response = await axios.get(config.SERVER_URL + 'get-listings', 
        {
            headers: { 'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'}
        })
        setListings(response.data)
        // console.log(response.data)
    }

    function openModal() {
        document.documentElement.style.setProperty('--scroll-top', '-' + document.documentElement.scrollTop + 'px')
        setScrollTop(document.documentElement.scrollTop)
        document.body.classList.add('modal-open')
      }
    
      function closeModal() {
        document.body.classList.remove('modal-open')
        window.scrollTo(0, scrollTop)
      }

    function openListingsModal() {
        openModal()
        setListingsModalIsOpen(true)
    }

    function closeListingsModal() {
        closeModal()
        setListingsModalIsOpen(false)
    }

    return (
        <div class="buy-a-home-main">
            <h1 class="buy-a-home-heading">Buy a Home</h1>
            <div class="buy-a-home-button-group">
                
                <button class="buy-a-home-button" onClick={onBeforeYouBuyClick}>Before You Buy  
                <div class="button__horizontal"></div>
                <div class="button__vertical"></div>
                </button>

                <button class="buy-a-home-button" onClick={onFindingTheDealClick}>Finding The Deal
                <div class="button__horizontal"></div>
                <div class="button__vertical"></div>
                </button>


                <button class="buy-a-home-button" onClick={onSealingTheDealClick}>Sealing The Deal
                <div class="button__horizontal"></div>
                <div class="button__vertical"></div>
                </button>
            </div>

            
            <div className="buy-a-home-content-group" onAnimationEnd={() => setFadeInBuyAHomeContent(0)} animation={fadeInBuyAHomeContent}>
                { showBuyAHomeParagraphBefore ? 

                <div class="buy-a-home-content">
                  
                    <img src={beforeYouBuy} alt="Before You Buy" class="buy-a-home-image"/> 
                    
                    <h2 classname = 'card-title'> Before you buy</h2>

                    <p class = "buy-a-home-paragraph">

                        Buying a home is one of the most challenging and rewarding experiences in your life.  
                        To guarantee a smooth process, contact your bank to get a preapproval letter. 
                        If you have any questions feel free to reach out to one of our qualified agents. <span class= "underline"> WRE is always here to serve you. </span>
                    </p>
                </div>
                : null }

                { showBuyAHomeParagraphFinding ? 
                <div class="buy-a-home-content">

                    <img src={findingTheDeal} alt="Finding The Deal" class="buy-a-home-image"/>
                   
                    <h2 classname = 'card-title'> Finding the deal </h2>

                    <p class = "buy-a-home-paragraph"> Finding the right home is as much as an art as it is a science. The first step is figure out what you want vs what you need in a home. When house hunting you should consider other factors beyond the price and style. <span class = "underline" >Our agents at WRE are best in understanding your budget, tastes, and lifestyles. </span>  </p>
                    
            
                    
                </div>
                : null }
                { showBuyAHomeParagraphSealing ? 
                <div class="buy-a-home-content">
                    <img src={sealingTheDeal} alt="Sealing The Deal" class="buy-a-home-image" />

                    <h2 class = "card-title"> Sealing the deal </h2>

                    <p class = "buy-a-home-paragraph"> You spotted the perfect home! Now the next step is to make the offer, and making an agreement with the seller. This is a grueling and tedious time but you do not have to worry. <span class="underline"> Our trusted agents will guide you through the process. </span>    </p>
                    


                </div>
                 : null }
            </div>
            <button class="listings-modal-button" onClick = {() => openListingsModal()}> Listings  </button>
            <Modal className = "listings-modal" isOpen = {listingsModalIsOpen} onRequestClose={() => closeListingsModal()}  
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: 2
                    },
                }}
            >
                <div class="listings-modal-heading">
                    <img src={closeModalImg} alt="Close Modal" class="close-listings-modal-button" onClick={() => closeListingsModal()} />
                </div>
                <div class="listings-modal-content">
                    <ListingsLayout listings={listings}/>
                </div>
            </Modal>
        </div>
    );
}

export default BuyAHome;