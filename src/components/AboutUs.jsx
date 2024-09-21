import React, { useState, useEffect, startTransition } from "react";
import closeModalImg from "../assets/close-modal.avif";
import "./AboutUs.css";
import config from "../config.js";
import AgentProfile from "./AgentProfile.jsx";
import Carousel from "react-multi-carousel";
import "../lib/react-multi-carousel.css";
import { useAgents } from "../contexts/AgentContext.js";
import CustomModal from "./CustomModal.jsx";

const AboutUs = () => {
  const { agents, loading, error } = useAgents();
  const [agentProfileModalIsOpen, setAgentProfileModalIsOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageLoadCount, setImageLoadCount] = useState(0);

  useEffect(() => {
    if (imageLoadCount === Object.values(agents).length) {
      startTransition(() => {
        setImagesLoaded(true);
      });
    }
  }, [imageLoadCount, agents]);

  const handleImageLoad = () => {
    setImageLoadCount((prevCount) => prevCount + 1);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  const openModal = () => {
    document.documentElement.style.setProperty(
      "--scroll-top",
      "-" + document.documentElement.scrollTop + "px",
    );
    setScrollTop(document.documentElement.scrollTop);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    document.body.classList.remove("modal-open");
    window.scrollTo(0, scrollTop);
  };

  const openAgentProfileModal = (agent) => {
    openModal();
    startTransition(() => {
      setSelectedAgent(agent);
      setAgentProfileModalIsOpen(true);
    });
  };

  const closeAgentProfileModal = () => {
    closeModal();
    startTransition(() => {
      setAgentProfileModalIsOpen(false);
      setSelectedAgent(null);
    });
  };

  if (loading) {
    return <div>Loading agents...</div>;
  }

  if (error) {
    return <div>Error loading agents: {error}</div>;
  }

  return (
    <div
      className={`about-us-main ${imagesLoaded ? "carousel-group-loaded" : "carousel-group-loading"}`}
    >
      <div className="carousel-group">
        <h1 className="carousel-heading">Meet Our Agents</h1>
        <div className="paragraph-div">
          <p className="about-us-paragraph">
            Williams Real Estate was founded on principles of{" "}
            <span>innovation</span>, <span>consistency</span>, and{" "}
            <span>excellence</span>. Our world-class agents are a call away to
            get you to the home of your dreams.
          </p>
        </div>
        <Carousel
          responsive={responsive}
          slidesToSlide={1}
          containerClass="carousel"
          itemClass="carousel-agent"
          arrows={true}
        >
          {Object.values(agents).map((agent) => (
            <img
              key={agent.id}
              className="agent-image"
              alt={agent.Name}
              src={`${config.SERVER_URL}/api/v1/agents/images/${agent.Image}`}
              onLoad={handleImageLoad}
              onClick={() => openAgentProfileModal(agent)}
            />
          ))}
        </Carousel>
      </div>
      <CustomModal
        isOpen={agentProfileModalIsOpen}
        onRequestClose={closeAgentProfileModal}
        className={"custom-modal-content"}
        overlayClassName={"custom-modal-overlay"}
      >
        <div className="agent-profile-modal-heading">
          <img
            src={closeModalImg}
            alt="Close Modal"
            className="close-agent-profile-modal-button"
            onClick={closeAgentProfileModal}
          />
        </div>
        <div className="agent-profile-modal-content">
          {selectedAgent && (
            <AgentProfile
              agentProfileName={selectedAgent.Name}
              agentProfileTitle={selectedAgent.Title}
              agentProfileImagePath={`${config.SERVER_URL}/api/v1/agents/images/${selectedAgent.Image}`}
              agentProfileOfficeNumber={selectedAgent.OfficeNumber}
              agentProfileCellNumber={selectedAgent.CellNumber}
              agentProfileEmail={selectedAgent.Email}
              agentProfileBio={selectedAgent.Bio}
            />
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default AboutUs;
