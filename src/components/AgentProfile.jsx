import React from "react";
import "./AgentProfile.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

function AgentProfile(props) {
  return (
    <div className="agent-profile-container">
      <div className="agent-profile-heading">
        <h1 className="agent-profile-name">{props.agentProfileName}</h1>
        <h2>{props.agentProfileTitle}</h2>
      </div>
      <div className="agent-profile-content">
        <img
          className="agent-profile-image"
          src={props.agentProfileImagePath}
          alt={props.agentProfileName}
        />
        <div className="agent-profile-text">
          <h4>{props.agentProfileBio}</h4>
          {/* <h4>
          Office Number: {props.agentProfileOfficeNumber}
        </h4> */}
          <h4>Cell Number: {props.agentProfileCellNumber}</h4>
          <h4>
            Email:{" "}
            <a
              href={`mailto:${props.agentProfileEmail}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.agentProfileEmail}
            </a>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default AgentProfile;
