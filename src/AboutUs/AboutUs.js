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
            <h1>About Us</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque arcu, ultrices sit amet ullamcorper a, luctus ut ante. Duis ullamcorper non elit at euismod. Duis posuere nec justo sit amet vestibulum. 
            Sed ex odio, molestie non faucibus vitae, consequat ut quam. Vestibulum porttitor metus a diam viverra, quis blandit tellus condimentum. In laoreet, justo id eleifend dictum, augue risus blandit orci, vel finibus ligula massa a sapien. 
            Aliquam ullamcorper facilisis malesuada. Nam ullamcorper fermentum ipsum sed dictum. Quisque tincidunt commodo orci vitae rhoncus. Suspendisse fermentum magna et tempus porta. Vivamus blandit mi enim, sit amet pretium sem varius in. 
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent id volutpat elit, in tristique mauris. Maecenas purus magna, ornare quis mauris ornare, aliquam sollicitudin tellus. Fusce sollicitudin aliquet commodo.
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