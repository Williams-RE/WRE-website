import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import config from './config.json';
// import logo from './images/wre-logo-new.png';
import closeModalImg from './images/close-modal.jpg';
// import niceHouse from './images/background.jpeg';
import LandingPage from './LandingPage/LandingPage';
import BuyAHome from './BuyAHome/BuyAHome';
import SellAHome from './SellAHome/SellAHome';
import AboutUs from './AboutUs/AboutUs';
import Modal from 'react-modal';
import axios from 'axios';
// import { getByTitle } from '@testing-library/react';
// import homevideo from './images/keys-to-the-house.mp4';
Modal.setAppElement('#root');


function App() {
  const landingPageRef = useRef();
  const buyAHomeRef = useRef();
  const sellAHomeRef = useRef();
  const aboutUsRef = useRef();

  const emailInputRef = useRef()
  const agentDropdownRef = useRef()

  const [agents, setAgents] = useState({})
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalButtonAnimeClass, setModalButtonAnimeClass] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agent, setAgent] = useState('');
  const [comment, setComment] = useState('');

  const [nameErrorClass, setNameErrorClass] = useState('')
  const [emailErrorClass, setEmailErrorClass] = useState('')
  const [namePlaceHolder, setNamePlaceHolder] = useState('Name*')
  const [emailPlaceHolder, setEmailPlaceHolder] = useState('Email*')

  const [scrollTop, setScrollTop] = useState(0)


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

  useEffect(() => {
    getAgents()
  }, [])

  async function getAgents() {
    const response = await axios.get(config.SERVER_URL + 'get-agents', 
    {
        headers: { 'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'}
    })
    setAgents(response.data)
}

  async function sendEmail(name, email, agent, comment) {
    const response = await axios.post(
      config.SERVER_URL + 'send-email',
      { 
        "name": name, "email": email, "agent": agent, "comment": comment,
        headers: { 'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'}
      }
    )
  }

  function onSubmitButtonClick(name, email, agent, comment) {
    let errorExists = false
    if (emailIsValid(email)) {
      setEmailErrorClass('')
    }
    else {
      setEmailErrorClass('error')
      setEmailPlaceHolder('Please enter a valid email address')
      errorExists = true
    }
    if (nameIsValid(name)) {
      setNameErrorClass('')
    }
    else {
      setNameErrorClass('error')
      setNamePlaceHolder('Please enter your name')
      errorExists = true
    }
    if (!errorExists) submitContactForm(name, email, agent, comment)   
  }

  function nameIsValid(name) {
    if (name.length > 0) return true
    else return false
  }

  function emailIsValid(email) {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) return true
    else return false
  }
  
  function submitContactForm(name, email, agent, comment) {
    setModalIsOpen(false);
    sendEmail(name, email, agent, comment);
    setName('')
    setEmail('')
    setAgent('')
    setComment('')
  }

  function onNameInputChange(name) {
    if (nameIsValid(name)) {
      setNameErrorClass('')
    }
    else {
      setNameErrorClass('error')
      setNamePlaceHolder('Please enter your name')
    }
    setName(name)
  }

  function onEmailInputChange(email) {
    if (emailIsValid(email)) {
      setEmailErrorClass('')
    }
    else {
      setEmailErrorClass('error')
      setEmailPlaceHolder('Please enter a valid email address')
    }
    setEmail(email)
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

  function modalOnClick()  {
    setModalIsOpen(true)
    setModalButtonAnimeClass("pause-animation")
    openModal()
  }

  function closeContactForm() {
    closeModal()
    setModalIsOpen(false)
    setName('')
    setEmail('')
    setAgent('')
    setComment('')
    setEmailErrorClass('')
    setNameErrorClass('')
    setNamePlaceHolder('Name*')
    setEmailPlaceHolder('Email*')
  }

  function handleNameKeyPress(event) {
    if (event.key === 'Enter') {
      // Focus on next input
      emailInputRef.current.focus()
    }
  }

  function handleEmailKeyPress(event) {
    if (event.key === 'Enter') {
      agentDropdownRef.current.focus()
    }
  }

  return (
    <div class="main">

      <button class={"modal-button " + modalButtonAnimeClass} onClick = {() => modalOnClick()}>
        <div class="pencil-svg"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg></div>
        <p class="modal-button-text">Contact Us</p>
      </button>
      <Modal className = "modal" isOpen = {modalIsOpen} onRequestClose={() => closeContactForm()}
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
        <div class="modal-heading">
          <h1 class="title-contact">Contact Form</h1>
          <img src={closeModalImg} alt="Close Modal" class="close-modal-button" onClick={() => closeContactForm()} />
        </div>
        <hr class="contact-line"/> 
        <div class="modal-element">
          <input class={`modal-input ${nameErrorClass}`}  placeholder={namePlaceHolder} type="text"  value={name} onInput={e => onNameInputChange(e.target.value)} onKeyDown={(e) => handleNameKeyPress(e)} required/> 
        </div>
        <div class="modal-element"> 
          <input class={`modal-input ${emailErrorClass}`} placeholder={emailPlaceHolder} type="email" value={email} onInput={e => onEmailInputChange(e.target.value)} onKeyDown={(e) => handleEmailKeyPress(e)} required ref={emailInputRef}/> 
        </div>
        <div class='modal-element'>  
          <select class='select-agents' name ='selectAgents'  value={agent} onChange={e => setAgent(e.target.value)} ref={agentDropdownRef}>
            <option value="" disabled>Agent</option>
            <option value="Jacob Williams">Jacob Williams</option>
            <option value="Mathew Thomas"> Mathew Thomas</option>
            <option value="Binu Jacob">Binu Jacob</option>
            <option value="Shazzat Tanvir">Shazzat Tanvir</option>
            <option value="Karen Roos">Karen Roos</option>
            <option value="Kerri Kaylor">Kerri Kaylor</option>
          </select> 
        </div>
        <div class="modal-element">
          <textarea class="modal-textarea" rows ="4"  placeholder="How can we help?" value={comment} onInput={e => setComment(e.target.value)}>  </textarea>
        </div>
        <div class="modal-element">
          <button class="submit-button" onClick = { () => onSubmitButtonClick(name, email, agent, comment)}> Submit</button>
        </div>
      </Modal>
        
      <nav class = "navigation">
        <button class="navigation-button" onClick={scrollToLandingPage}>
          {/* <img class="logo" src={ logo } alt="logo" /> */}
          <span class="">Home </span>
        </button>
        <button class="navigation-button" onClick={scrollToBuyAHome}>
          <span class=""> Buy </span>
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
          <AboutUs agents={agents} />
        </div>
      </div>
    </div>
  );
}

export default App;
