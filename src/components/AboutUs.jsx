import React, { useState } from "react";
import "./AboutUs.css";
import config from "../config.js";
import AgentProfile from "./AgentProfile.jsx";
import closeModalImg from "../assets/close-modal.avif";
import Modal from "react-modal";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function AboutUs({ agents }) {
  const [agentProfileModalIsOpen, setAgentProfileModalIsOpen] = useState(false);
  const [agentProfileName, setAgentProfileName] = useState("");
  const [agentProfileTitle, setAgentProfileTitle] = useState("");
  const [agentProfileImagePath, setAgentProfileImagePath] = useState("");
  const [agentProfileOfficeNumber, setAgentProfileOfficeNumber] = useState("");
  const [agentProfileCellNumber, setAgentProfileCellNumber] = useState("");
  const [agentProfileEmail, setAgentProfileEmail] = useState("");
  const [agentProfileBio, setAgentProfileBio] = useState("");

  const [scrollTop, setScrollTop] = useState(0);
  const [carouselAgentNum, setCarouselAgentNum] = useState(5);

  const agentsArray = [];
  Object.keys(agents).forEach((agent) => {
    agentsArray.push(agents[agent]);
  });

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 3,
    },
  };

  function openModal() {
    document.documentElement.style.setProperty(
      "--scroll-top",
      "-" + document.documentElement.scrollTop + "px",
    );
    setScrollTop(document.documentElement.scrollTop);
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    document.body.classList.remove("modal-open");
    window.scrollTo(0, scrollTop);
  }

  function openAgentProfileModal(agentName) {
    openModal();
    setAgentProfileName(agents[agentName]["Name"]);
    setAgentProfileTitle(agents[agentName]["Title"]);
    setAgentProfileImagePath(
      `${config.SERVER_URL}/agents/images/` + agents[agentName]["Image"],
    );
    setAgentProfileOfficeNumber(agents[agentName]["OfficeNumber"]);
    setAgentProfileCellNumber(agents[agentName]["CellNumber"]);
    setAgentProfileEmail(agents[agentName]["Email"]);
    setAgentProfileBio(agents[agentName]["Bio"]);
    setAgentProfileModalIsOpen(true);
  }

  function closeAgentProfileModal() {
    closeModal();
    setAgentProfileModalIsOpen(false);
  }

  return (
    <div className="about-us-main">
      <div className="carousel-group">
        <h1 className="carousel-heading">Meet Our Agents</h1>
        <Carousel
          responsive={responsive}
          slidesToSlide={4}
          containerClass="carousel"
          itemClass="carousel-agent"
          arrows={false}
          customButtonGroup={<CustomButtonGroupAsArrows />}
          renderButtonGroupOutside={true}
        >
          {agentsArray.map((agent) => {
            return (
              <img
                className="agent-image"
                alt="Agent"
                src={`${config.SERVER_URL}/agents/images/` + agent["Image"]}
                onClick={() => openAgentProfileModal(agent["Name"])}
              />
            );
          })}
        </Carousel>
      </div>
      <div className="paragraph-div">
        <p className="about-us-paragraph">
          Williams Real Estate was founded on principles of{" "}
          <span className="principles">innovation</span>,{" "}
          <span className="principles">consistency</span>, and{" "}
          <span className="principles">excellence</span>. Our world class agents
          are a call away to get you to the home of your dreams.
        </p>
      </div>
      <Modal
        className="agent-profile-modal"
        isOpen={agentProfileModalIsOpen}
        onRequestClose={() => closeAgentProfileModal()}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 2,
          },
        }}
      >
        <div className="agent-profile-modal-heading">
          <img
            src={closeModalImg}
            alt="Close Modal"
            className="close-agent-profile-modal-button"
            onClick={() => closeAgentProfileModal()}
          />
        </div>
        <div className="agent-profile-modal-content">
          <AgentProfile
            agentProfileModalIsOpen={agentProfileModalIsOpen}
            setAgentProfileModalIsOpen={setAgentProfileModalIsOpen}
            agentProfileName={agentProfileName}
            agentProfileTitle={agentProfileTitle}
            agentProfileImagePath={agentProfileImagePath}
            agentProfileOfficeNumber={agentProfileOfficeNumber}
            agentProfileCellNumber={agentProfileCellNumber}
            agentProfileEmail={agentProfileEmail}
            agentProfileBio={agentProfileBio}
          />
        </div>
      </Modal>
    </div>
  );
}

const CustomButtonGroupAsArrows = ({ next, previous }) => {
  return (
    <div className="button-group">
      <div className="arrow left" onClick={previous} />
      <div className="arrow right" onClick={next} />
    </div>
  );
};

export default AboutUs;
