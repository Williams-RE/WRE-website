import React, { useState, useEffect } from 'react';
import './AboutUs.css';
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

function AboutUs() {
    const [agents, setAgents] = useState({})
    const [agentsLoading, setAgentsLoading] = useState(false)
    const [agentProfileModalIsOpen, setAgentProfileModalIsOpen] = useState(false)
    const [agentProfileName, setAgentProfileName] = useState('')
    const [agentProfileTitle, setAgentProfileTitle] = useState('')
    const [agentProfileImagePath, setAgentProfileImagePath] = useState('')
    const [agentProfileOfficeNumber, setAgentProfileOfficeNumber] = useState('')
    const [agentProfileCellNumber, setAgentProfileCellNumber] = useState('')
    const [agentProfileEmail, setAgentProfileEmail] = useState('')
    const [agentProfileBio, setAgentProfileBio] = useState('')

    useEffect(() => {
      getAgents()
      // Turn agents into array maybe
    }, [])

    async function getAgents() {
      setAgentsLoading(true)
      const response = await axios.get('http://localhost:3001/get-agents', 
      {
          headers: { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin' : '*',
                  'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'}
      })
      setAgents(response.data)
      setAgentsLoading(false)
      // Should I create agents array?
  }

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
          setAgentProfileImagePath('http://localhost:3001/agents/images/' + agents[agentName]['Image'])
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
            {/* <p>
              {agents['Jacob Williams']['Name']}
            </p> */}
            {/* {
              agentsLoading ? 
              <p>Loading</p>
              : <img class="agent-image" alt={agents['Jacob Williams']['Name']} src={'http://localhost:3001/agents/images/Jacob.jpg'} onClick={() => openAgentProfileModal(agents['Jacob Williams']['Name'])}/>
            } */}
            
            <Carousel responsive={responsive} slidesToSlide={5} containerClass="carousel" itemClass="carousel-agent" arrows={false} customButtonGroup={<CustomButtonGroupAsArrows />} renderButtonGroupOutside={true}>
              {/* {Object.keys(agents).forEach(agent => {
                return <img class="agent-image" alt="Agent" src={'http://localhost:3001/agents/images/' + agents[agent]['Image']} onClick={() => openAgentProfileModal(agents[agent]['Name'])}/>
              })} */}
              {/* <img class="agent-image" alt={agents['Jacob Williams']['Name']} src={'http://localhost:3001/agents/images/Jacob.jpg'} onClick={() => openAgentProfileModal(agents['Jacob Williams']['Name'])}/> */}
                    <img class="agent-image" alt="Jacob" src={'http://localhost:3001/agents/images/Jacob.jpg'} onClick={() => openAgentProfileModal("Jacob Williams")}/>
                    <img class="agent-image" alt="Pam" src={'http://localhost:3001/agents/images/Pam.jpg'} onClick={() => openAgentProfileModal("Pam Buzzeo")}/>
                    <img class="agent-image" alt="Mathews" src={'http://localhost:3001/agents/images/Mathews.jfif'} onClick={() => openAgentProfileModal("Mathews Thomas")}/>
                    <img class="agent-image" alt="Binu" src={'http://localhost:3001/agents/images/Binu.gif'} onClick={() => openAgentProfileModal("Binu Jacob")}/>
                    <img class="agent-image" alt="Hilda" src={'http://localhost:3001/agents/images/Hilda.gif'} onClick={() => openAgentProfileModal("Hilda Christi")}/>
                    <img class="agent-image" alt="Shazzat" src={'http://localhost:3001/agents/images/Shazzat.gif'} onClick={() => openAgentProfileModal("Shazzat Tanvir")}/>
                    <img class="agent-image" alt="Karen" src={'http://localhost:3001/agents/images/Karen.png'} onClick={() => openAgentProfileModal("Karen Bruno-Roos")}/>
                    <img class="agent-image" alt="Kerri" src={'http://localhost:3001/agents/images/Kerri.gif'} onClick={() => openAgentProfileModal("Kerri Kaylor")}/>
                    <img class="agent-image" alt="Rashed" src={'http://localhost:3001/agents/images/Rashed.jpg'} onClick={() => openAgentProfileModal("Rashed Ahmed")}/>
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
                        background: '#c59775',
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
        <img src={leftCarouselArrow} alt="Left Carousel Arrow" class="left-carousel-arrow" onClick={previous}/>
        <img src={rightCarouselArrow} alt="Right Carousel Arrow" class="right-carousel-arrow" onClick={next}/>
      </div>
    );
  };

export default AboutUs;