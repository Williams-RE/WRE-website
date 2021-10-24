import React, { useState, useEffect } from 'react';
import './AboutUs.css';
import config from '../config.json';
import AgentProfile from './AgentProfile/AgentProfile';
import closeModalImg from '../images/close-modal.jpg';
import Modal from 'react-modal';
// import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import rightCarouselArrow from '../images/right-carousel-arrow.png';
// import leftCarouselArrow from '../images/left-carousel-arrow.png';

function AboutUs({agents}) {
    const [agentProfileModalIsOpen, setAgentProfileModalIsOpen] = useState(false)
    const [agentProfileName, setAgentProfileName] = useState('')
    const [agentProfileTitle, setAgentProfileTitle] = useState('')
    const [agentProfileImagePath, setAgentProfileImagePath] = useState('')
    const [agentProfileOfficeNumber, setAgentProfileOfficeNumber] = useState('')
    const [agentProfileCellNumber, setAgentProfileCellNumber] = useState('')
    const [agentProfileEmail, setAgentProfileEmail] = useState('')
    const [agentProfileBio, setAgentProfileBio] = useState('')

    const [scrollTop, setScrollTop] = useState(0)
    const [carouselAgentNum, setCarouselAgentNum] = useState(5)

    const agentsArray = []
    Object.keys(agents).forEach(agent => {
      agentsArray.push(agents[agent])
    })
  //   useEffect(() => {
  //     getAgents()
  //     // Turn agents into array maybe
  //   }, [])

  //   async function getAgents() {
  //     const response = await axios.get(config.SERVER_URL + 'get-agents', 
  //     {
  //         headers: { 'Content-Type': 'application/json',
  //                 'Access-Control-Allow-Origin' : '*',
  //                 'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
  //                 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'}
  //     })
  //     setAgents(response.data)
  //     // Should I create agents array?
  // }

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 768 },
          items: 4
        },
        mobile: {
          breakpoint: { max: 768, min: 0 },
          items: 3
        }
      };

      function openModal() {
        document.documentElement.style.setProperty('--scroll-top', '-' + document.documentElement.scrollTop + 'px')
        setScrollTop(document.documentElement.scrollTop)
        document.body.classList.add('modal-open')
      }
    
      function closeModal() {
        document.body.classList.remove('modal-open')
        window.scrollTo(0, scrollTop)
      }

      function openAgentProfileModal(agentName) {
          openModal()
          setAgentProfileName(agents[agentName]['Name'])
          setAgentProfileTitle(agents[agentName]['Title'])
          setAgentProfileImagePath(config.SERVER_URL + 'agents/images/' + agents[agentName]['Image'])
          setAgentProfileOfficeNumber(agents[agentName]['OfficeNumber'])
          setAgentProfileCellNumber(agents[agentName]['CellNumber'])
          setAgentProfileEmail(agents[agentName]['Email'])
          setAgentProfileBio(agents[agentName]['Bio'])
          setAgentProfileModalIsOpen(true)
      }

      function closeAgentProfileModal() {
        closeModal()
        setAgentProfileModalIsOpen(false)
      }

    return (
        <div class="about-us-main">
            {/* <h1 class= "about-us-heading"> About Us</h1> */}
            <div class="carousel-group">
              <h1 class="carousel-heading">
                Meet Our Agents
              </h1>
              <Carousel responsive={responsive} slidesToSlide={4} containerClass="carousel" itemClass="carousel-agent" arrows={false} customButtonGroup={<CustomButtonGroupAsArrows />} renderButtonGroupOutside={true}>
              {agentsArray.map(agent => {
                return <img class="agent-image" alt="Agent" src={config.SERVER_URL + 'agents/images/' + agent['Image']} onClick={() => openAgentProfileModal(agent['Name'])}/>
              })}
              </Carousel>
            </div>
            <div class="paragraph-div">
              <p class="about-us-paragraph">
                Williams Real Estate was founded on principles of <span class="principles">innovation</span>,  <span class="principles">consistency</span>, and <span class="principles">excellence</span>.  Our world class agents are a call away to get you to the home of your dreams. 
              </p>
            </div>
            <Modal className = "agent-profile-modal" isOpen = {agentProfileModalIsOpen} onRequestClose={() => closeAgentProfileModal()}
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
                <div class="agent-profile-modal-heading">
                  <img src={closeModalImg} alt="Close Modal" class="close-agent-profile-modal-button" onClick={() => closeAgentProfileModal()} />
                </div>
                <div class="agent-profile-modal-content">
                  <AgentProfile agentProfileModalIsOpen={agentProfileModalIsOpen} setAgentProfileModalIsOpen={setAgentProfileModalIsOpen}
                  agentProfileName={agentProfileName} agentProfileTitle={agentProfileTitle}
                  agentProfileImagePath={agentProfileImagePath} agentProfileOfficeNumber={agentProfileOfficeNumber}
                  agentProfileCellNumber={agentProfileCellNumber} agentProfileEmail={agentProfileEmail}
                  agentProfileBio={agentProfileBio}
                  />
                </div>
            </Modal>
        </div>
    );
}

const CustomButtonGroupAsArrows = ({ next, previous }) => {
    return (
      <div class="button-group">
        <div class="arrow left" onClick={previous}/>
        <div class="arrow right" onClick={next}/>
        {/* <img src={leftCarouselArrow} alt="Left Carousel Arrow" class="carousel-arrow left-carousel-arrow" onClick={previous}/>
        <img src={rightCarouselArrow} alt="Right Carousel Arrow" class="carousel-arrow right-carousel-arrow" onClick={next}/> */}
      </div>
    );
  };

export default AboutUs;