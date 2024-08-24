import { useState, useEffect } from "react";
import closeModalImg from "../assets/close-modal.avif";
import Modal from "react-modal";
import "./ModalButton.css";
import { sendEmail } from "../lib/utils";
import { useAgents } from "../contexts/AgentContext.js";

export const ModalButton = ({ showDelay }) => {
  const [showButton, setShowButton] = useState(!showDelay);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agent, setAgent] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const { agents, loading, error: agentsError } = useAgents();
  console.log(Object.values(agents));
  console.log("agent", agent);
  useEffect(() => {
    if (showDelay) {
      const initialTimer = setTimeout(() => {
        setShowButton(true);
      }, 10000);

      return () => clearTimeout(initialTimer);
    }
  }, [showDelay]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email) {
      setError("Name and Email are required.");
      return;
    }
    try {
      await sendEmail(name, email, agent, comment);
      setModalIsOpen(false);
      setName("");
      setEmail("");
      setAgent("");
      setComment("");
    } catch (error) {
      setError("Failed to send message. Please try again.");
    }
  };

  function nameIsValid(name) {
    if (name.length > 0) return true;
    else return false;
  }

  function emailIsValid(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
  }

  if (!showButton) {
    return null;
  }

  return (
    <>
      <button
        className={`modal-button ${showButton ? "fade-in" : ""}`}
        onClick={() => setModalIsOpen(true)}
      >
        <svg
          className="contact-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2>Let's Connect</h2>
          <p>Fill out the details below and we'll reach out to you shortly!</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Name*</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="agent">Agent</label>
              <select
                id="agent"
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
              >
                <option value="">Select an agent</option>
                {loading ? (
                  <option disabled>Loading agents...</option>
                ) : (
                  Object.values(agents).map((agent) => (
                    <option key={agent.MATRIX_UNIQUE_ID} value={agent.Name}>
                      {agent.Name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="comment">Comments</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Anything you'd like to share before we chat?"
              ></textarea>
            </div>
            {(error || agentsError) && (
              <p className="error-message">{error || agentsError}</p>
            )}
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
          <button
            className="close-modal-button"
            onClick={() => setModalIsOpen(false)}
          >
            <img src={closeModalImg} alt="Close" />
          </button>
        </div>
      </Modal>
    </>
  );
};
