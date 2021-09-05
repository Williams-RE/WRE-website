import React from 'react';
import './App.css';
import { useRef, useState } from 'react';
import logo from './images/wre-logo-new.png';
import LandingPage from './LandingPage/LandingPage';
import BuyAHome from './BuyAHome/BuyAHome';
import SellAHome from './SellAHome/SellAHome';
import AboutUs from './AboutUs/AboutUs';
import Modal from 'react-modal';
import axios from 'axios';

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
      
      <div class="background"> </div>
      


      <button class='modal-button' onClick = {() => setModalIsOpen(true)}> Contact Us  </button>
      <Modal isOpen = {modalIsOpen}> 

        <label> Name: </label>
        <input  type="text"  value={name} onInput={e => setName(e.target.value)}/>
        <br></br>

        <label> Email: </label>
        <input type="email"  value={email} onInput={e => setEmail(e.target.value)}/> 
        <br></br>

        <label> Select Agents: </label>
        <select name ='selectAgents'  value={agent} onChange={e => setAgent(e.target.value)} >

          <option value="JACOB">JACOB</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>

        </select> 

        <br></br>
        
        <label> Comment: </label> 
        <textarea  value={comment} onInput={e => setComment(e.target.value)}>  </textarea>
        
        <br></br>

        <button class="submit-button" onClick = { () => submitContactForm(name, email, agent, comment)}> Submit</button>

        
      </Modal>


        
      <nav class = "navigation">
        <button class="logo-button" onClick={scrollToLandingPage}>
          <img class="logo" src={ logo } alt="logo" />
        </button>
        <button class="navigation-button" onClick={scrollToBuyAHome}>
          <span class="">Buy a Home</span>
        </button> 
        <button class="navigation-button" onClick={scrollToSellAHome}>
          <span class="">Sell a Home</span>
        </button>
        <button class="navigation-button" onClick={scrollToAboutUs}>
          <span class="">About Us</span>
        </button>
      </nav>

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
  );
}

export default App;
