import React from 'react';
import './AgentProfile.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');


 function AgentProfile(props) {
     return (
        <div class="agent-profile-container">
                <div class="agent-profile-heading">
                    <h1 class="agent-profile-name">{props.agentProfileName}</h1>
                    <h2>{props.agentProfileTitle}</h2>
                </div>
                <div class="agent-profile-content">
                    <img class="agent-profile-image" src={props.agentProfileImagePath} alt={props.agentProfileName}/>
                    <h4>
                        {props.agentProfileBio}
                    </h4>
                    <h4>
                        Office Number: {props.agentProfileOfficeNumber}
                    </h4>
                    <h4>
                        Cell Number: {props.agentProfileCellNumber}
                    </h4>
                    <h4>
                        Email: {props.agentProfileEmail}
                    </h4>
                </div>
        </div>
     );
 }

 export default AgentProfile;