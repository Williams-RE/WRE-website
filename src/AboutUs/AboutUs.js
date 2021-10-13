import React, { useState, useEffect } from 'react';
import './AboutUs.css';
import config from '../config.json';
import AgentProfile from './AgentProfile/AgentProfile';
import Modal from 'react-modal';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import rightCarouselArrow from '../images/right-carousel-arrow.png';
import leftCarouselArrow from '../images/left-carousel-arrow.png';
// import Jacob from '../images/agents/Jacob.jpg';
// import Pam from '../images/agents/Pam.jpg';
// import Mathews from '../images/agents/Mathews.jfif';
// import Binu from '../images/agents/Binu.gif';
// import Hilda from '../images/agents/Hilda.gif';
// import Shazzat from '../images/agents/Shazzat.gif';
// import Karen from '../images/agents/Karen.png';
// import Kerri from '../images/agents/Kerri.gif';
// import Rashed from '../images/agents/Rashed.jpg';

function AboutUs({agents}) {
    // const [agents, setAgents] = useState({})
    const [agentProfileModalIsOpen, setAgentProfileModalIsOpen] = useState(false)
    const [agentProfileName, setAgentProfileName] = useState('')
    const [agentProfileTitle, setAgentProfileTitle] = useState('')
    const [agentProfileImagePath, setAgentProfileImagePath] = useState('')
    const [agentProfileOfficeNumber, setAgentProfileOfficeNumber] = useState('')
    const [agentProfileCellNumber, setAgentProfileCellNumber] = useState('')
    const [agentProfileEmail, setAgentProfileEmail] = useState('')
    const [agentProfileBio, setAgentProfileBio] = useState('')

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

      function openAgentProfileModal(agentName) {
          // Set all the agent profile states
          setAgentProfileName(agents[agentName]['Name'])
          setAgentProfileTitle(agents[agentName]['Title'])
          setAgentProfileImagePath(config.SERVER_URL + 'agents/images/' + agents[agentName]['Image'])
          setAgentProfileOfficeNumber(agents[agentName]['OfficeNumber'])
          setAgentProfileCellNumber(agents[agentName]['CellNumber'])
          setAgentProfileEmail(agents[agentName]['Email'])
          setAgentProfileBio(agents[agentName]['Bio'])
          setAgentProfileModalIsOpen(true)
      }

    return (
        <div class="about-us-main">
            <h1>About Us</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque arcu, ultrices sit amet ullamcorper a, luctus ut ante. Duis ullamcorper non elit at euismod. Duis posuere nec justo sit amet vestibulum. 
            Sed ex odio, molestie non faucibus vitae, consequat ut quam. Vestibulum porttitor metus a diam viverra, quis blandit tellus condimentum. In laoreet, justo id eleifend dictum, augue risus blandit orci, vel finibus ligula massa a sapien. 
            Aliquam ullamcorper facilisis malesuada. Nam ullamcorper fermentum ipsum sed dictum. Quisque tincidunt commodo orci vitae rhoncus. Suspendisse fermentum magna et tempus porta. Vivamus blandit mi enim, sit amet pretium sem varius in. 
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent id volutpat elit, in tristique mauris. Maecenas purus magna, ornare quis mauris ornare, aliquam sollicitudin tellus. Fusce sollicitudin aliquet commodo.
            </p>
            <Carousel responsive={responsive} slidesToSlide={5} containerClass="carousel" itemClass="carousel-agent" arrows={false} customButtonGroup={<CustomButtonGroupAsArrows />} renderButtonGroupOutside={true}>
              {agentsArray.map(agent => {
                return <img class="agent-image" alt="Agent" src={config.SERVER_URL + 'agents/images/' + agent['Image']} onClick={() => openAgentProfileModal(agent['Name'])}/>
              })}
            </Carousel>
            <Modal className = "modal" isOpen = {agentProfileModalIsOpen} onRequestClose={() => setAgentProfileModalIsOpen(false)}
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
                        top: '50%',
                        left: '50%',
                        right: '0',
                        bottom: '0',
                        transform: 'translate(-50%, -50%)',
                        width: '40%',
                        height: '80%',
                        minWidth: '500px',
                        minHeight: '600px',
                        backgroundPosition: 'center',
                        border: '1px solid #ccc',
                        background: 'rgba(240, 234, 214)',
                        overflowX: 'auto',
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
              <AgentProfile agentProfileModalIsOpen={agentProfileModalIsOpen} setAgentProfileModalIsOpen={setAgentProfileModalIsOpen}
                agentProfileName={agentProfileName} agentProfileTitle={agentProfileTitle}
                agentProfileImagePath={agentProfileImagePath} agentProfileOfficeNumber={agentProfileOfficeNumber}
                agentProfileCellNumber={agentProfileCellNumber} agentProfileEmail={agentProfileEmail}
                agentProfileBio={agentProfileBio}
                />
            </Modal>
        </div>
    );
}

const CustomButtonGroupAsArrows = ({ next, previous }) => {
    return (
      <div class="button-group">
        <img src={leftCarouselArrow} alt="Left Carousel Arrow" class="carousel-arrow left-carousel-arrow" onClick={previous}/>
        <img src={rightCarouselArrow} alt="Right Carousel Arrow" class="carousel-arrow right-carousel-arrow" onClick={next}/>
      </div>
    );
  };

export default AboutUs;