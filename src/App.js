import React, { useRef, useState } from 'react';
import './App.css';
import logo from './images/wre-logo-new.png';
// import niceHouse from './images/background.jpeg';
import LandingPage from './LandingPage/LandingPage';
import BuyAHome from './BuyAHome/BuyAHome';
import SellAHome from './SellAHome/SellAHome';
import AboutUs from './AboutUs/AboutUs';
import Modal from 'react-modal';
import axios from 'axios';
import { getByTitle } from '@testing-library/react';
// import homevideo from './images/keys-to-the-house.mp4';
Modal.setAppElement('#root');


function App() {
  const landingPageRef = useRef();
  const buyAHomeRef = useRef();
  const sellAHomeRef = useRef();
  const aboutUsRef = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agent, setAgent] = useState('Jacob');
  const [comment, setComment] = useState('');

  function scrollToLandingPage() {
    landingPageRef.current.scrollIntoView({ behavior: 'smooth'});
  }
  
  function scrollToBuyAHome() {
    buyAHomeRef.current.scrollIntoView({ behavior: 'smooth'});
  }
  
  function scrollToSellAHome() {
    sellAHomeRef.current.scrollIntoView({ behavior: 'smooth'});
  }
  
  function scrollToAboutUs() {
    aboutUsRef.current.scrollIntoView({ behavior: 'smooth'});
  }

  async function sendEmail(name, email, agent, comment) {
    const response = await axios.post(
      'http://localhost:3001/send-email',
      { 
        "name": name, "email": email, "agent": agent, "comment": comment,
        headers: { 'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'}
      }
    )
    console.log(response.data)

  }
  
  function submitContactForm(name, email, agent, comment) {
    setModalIsOpen(false);
    sendEmail(name, email, agent, comment);
  }


  return (
    <div class="main">

      <button class="modal-button" onClick = {() => setModalIsOpen(true)}> Contact Us  </button>
      <Modal className = "modal" isOpen = {modalIsOpen} onRequestClose={() => setModalIsOpen(false)}  
        style={{

          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
           
          },
          content: {
            position: 'absolute',
            top: '20%',
            left: '35%',
            right: '35%',
            bottom: '20%',
            border: '1px solid #ccc',
            background: 'white',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '1.5071590052750565vh',
            radius: '1px',
           
              }
            }}
      >

        <h1 class="title-contact"> Contact Form </h1>

        <hr class="contact-line"/> 


        <div class="name">

          <label class="modal-label"> Name: </label> 

          <input class="modal-input" placeholder="First & Last" type="text"  value={name} onInput={e => setName(e.target.value)}/> 
          
        </div>
      
        
        <div class="modal-element"> 

          <label class="modal-label"> Email: </label>

          <input class="modal-input" placeholder="you@domain.com" type="email"   value={email} onInput={e => setEmail(e.target.value)}/> 
          
        </div>

        
        <div class='modal-element'>  

          <label class="modal-label"> Agent: </label>

          <select class='select-agents' name ='selectAgents'  value={agent} onChange={e => setAgent(e.target.value)} >

            <option value="Jacob Williams">Jacob Williams</option>
            <option value="Pam Buzzeo">Pam Buzzeo</option>
            <option value="Mathew Thomas"> Mathew Thomas</option>
            <option value="Binu Jacob">Binu Jacob</option>
            <option value="Hilda Christi">Hilda Christi</option>
            <option value="Shazzat Tanvir">Shazzat Tanvir</option>
            <option value="Karen Bruno">Karen Bruno</option>
            <option value="Kerri Kaylor">Kerri Kaylor</option>
            <option value="Rashed Ahmed">Rashed Ahmed</option>

          </select> 
        
        </div>


        <div class="modal-element">
        
          <label class="modal-label" > Subject:</label> 

          <textarea class="modal-textarea" rows ="4"  placeholder="Write something.." value={comment} onInput={e => setComment(e.target.value)}>  </textarea>

          <button class="submit-button" onClick = { () => submitContactForm(name, email, agent, comment)}> Submit</button>

        </div>


      </Modal>
        
      <nav class = "navigation">
        <button class="navigation-button" onClick={scrollToLandingPage}>
          {/* <img class="logo" src={ logo } alt="logo" /> */}
          <span class="">WRE </span>
        </button>
        <button class="navigation-button" onClick={scrollToBuyAHome}>
          <span class=""> Buy</span>
        </button> 
        <button class="navigation-button" onClick={scrollToSellAHome}>
          <span class=""> Sell </span>
        </button>
        <button class="navigation-button" onClick={scrollToAboutUs}>
          <span class="">About Us</span>
        </button>
      </nav>

      {/* <img src={niceHouse} alt="A nice home" class="landing-page-image"/> */}
      
      <div class="background"> 
      {/* in case we want to include a video 
      <video autoplay loop>
         <source src= {homevideo} type="video/mp4"/> 
         Your browser is not supported.
        </video>  */}
      
      </div>

      <div class="content">
        <div ref={landingPageRef}>
          <LandingPage />
        </div>
        <div class="page" ref={buyAHomeRef}>
          <BuyAHome />
        </div>
        <div class="page" ref={sellAHomeRef}>
          <SellAHome />
        </div>
        <div class="page" ref={aboutUsRef}>
          <AboutUs />
        </div>
      </div>
    </div>
  );
}

export default App;
