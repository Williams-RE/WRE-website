import React from 'react';
import './AgentProfile.css';


 function AgentProfile(props) {
     return (
        <div class="agent-profile-container">
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
        </div>
     );
 }

 export default AgentProfile;