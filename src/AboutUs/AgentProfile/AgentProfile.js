import React from 'react';
import './AgentProfile.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');


 function AgentProfile(props) {
     return (
        <div class="agent-profile-container">
            <Modal className = "modal" isOpen = {props.agentProfileModalIsOpen} onRequestClose={() => props.setAgentProfileModalIsOpen(false)}  
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
                    padding: '20px',
                    radius: '1px'
                }
                }}
            > 
                <div class="agent-profile-heading">
                    <h2>{props.agentProfileName}</h2>
                    <h3>{props.agentProfileTitle}</h3>
                </div>
                <div class="agent-profile-content">
                    <img src={props.agentProfileImagePath} alt={props.agentProfileName}/>
                    <p>
                        {props.agentProfileBio}
                    </p>
                    <p>
                        {props.agentProfileOfficeNumber}
                    </p>
                    <p>
                        {props.agentProfileCellNumber}
                    </p>
                    <p>
                        {props.agentProfileEmail}
                    </p>
                </div>
            </Modal>
        </div>
     );
 }

 export default AgentProfile;