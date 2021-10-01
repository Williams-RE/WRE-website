import React, { useState } from 'react';
import './AboutUs.css';
import AgentProfile from './AgentProfile/AgentProfile';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import rightCarouselArrow from '../images/right-carousel-arrow.png';
import leftCarouselArrow from '../images/left-carousel-arrow.png';
import Jacob from '../images/agents/Jacob.jpg';
import Pam from '../images/agents/Pam.jpg';
import Mathews from '../images/agents/Mathews.jfif';
import Binu from '../images/agents/Binu.gif';
import Hilda from '../images/agents/Hilda.gif';
import Shazzat from '../images/agents/Shazzat.gif';
import Karen from '../images/agents/Karen.png';
import Kerri from '../images/agents/Kerri.gif';
import Rashed from '../images/agents/Rashed.jpg';

function AboutUs() {
    const [agentProfileModalIsOpen, setAgentProfileModalIsOpen] = useState(false);
    const [agentProfileName, setAgentProfileName] = useState('Jacob');
    const [agentProfileTitle, setAgentProfileTitle] = useState('Broker');
    const [agentProfileImagePath, setAgentProfileImagePath] = useState('');
    const [agentProfileOfficeNumber, setAgentProfileOfficeNumber] = useState('');
    const [agentProfileCellNumber, setAgentProfileCellNumber] = useState('');
    const [agentProfileEmail, setAgentProfileEmail] = useState('');


    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 5
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 5
        }
      };

      function openAgentProfileModal() {
          // Set all the agent profile states
          // Where should the agent profile data be stored for reference?
          
      }

    return (
        <div class="about-us-main">
            <AgentProfile agentProfileModalIsOpen={agentProfileModalIsOpen} setAgentProfileModalIsOpen={setAgentProfileModalIsOpen}
              agentProfileName={agentProfileName} agentProfileTitle={agentProfileTitle}
              agentProfileImagePath={agentProfileImagePath} agentProfileOfficeNumber={agentProfileOfficeNumber}
              agentProfileCellNumber={agentProfileCellNumber} agentProfileEmail={agentProfileEmail}
              />
            <h1 class= 'about-us-text'> About us</h1>
            <p>
            Williams Real Estate was founded on principles of 
            </p>
            <Carousel responsive={responsive} slidesToSlide={5} containerClass="carousel" itemClass="carousel-agent" arrows={false} customButtonGroup={<CustomButtonGroupAsArrows />} renderButtonGroupOutside={true}>
                    <img class="agent-image" alt="Jacob" src={Jacob} onClick={() => openAgentProfileModal()}/>
                    <img class="agent-image" alt="Pam" src={Pam}/>
                    <img class="agent-image" alt="Mathews" src={Mathews}/>
                    <img class="agent-image" alt="Binu" src={Binu}/>
                    <img class="agent-image" alt="Hilda" src={Hilda}/>
                    <img class="agent-image" alt="Shazzat" src={Shazzat}/>
                    <img class="agent-image" alt="Karen" src={Karen}/>
                    <img class="agent-image" alt="Kerri" src={Kerri}/>
                    <img class="agent-image" alt="Rashed" src={Rashed}/>
            </Carousel>
        </div>
    );
}

const CustomButtonGroupAsArrows = ({ next, previous }) => {
    return (
      <div class="button-group">
        <img src={leftCarouselArrow} alt="Left Carousel Arrow" class="left-carousel-arrow" onClick={previous}/>
        <img src={rightCarouselArrow} alt="Right Carousel Arrow" class="right-carousel-arrow" onClick={next}/>
      </div>
    );
  };

export default AboutUs;