import { useState, useEffect } from "react";
import closeModalImg from "../assets/close-modal.avif";
import Modal from "react-modal";
import "./ModalButton.css";
import toast, { Toaster } from "react-hot-toast";
import { sendEmail, validateEmail } from "../lib/utils";
import { useAgents } from "../contexts/AgentContext.js";

export const ModalButton = ({ showDelay }) => {
  const [showButton, setShowButton] = useState(!showDelay);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agent, setAgent] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const { agents, loading, error: agentsError } = useAgents();

  useEffect(() => {
    if (showDelay) {
      const initialTimer = setTimeout(() => {
        setShowButton(true);
      }, 10000);

      return () => clearTimeout(initialTimer);
    }
  }, [showDelay]);

  const validateAgent = (agent) => {
    return agent.trim().length > 0;
  };

  const validateComment = (comment) => {
    return comment.trim().length <= 500; // Example: limit comment to 500 characters
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.length) newErrors.name = "Name is required.";
    if (!validateEmail(email))
      newErrors.email = "Please enter a valid email address.";
    if (!validateAgent(agent)) newErrors.agent = "Please select an agent.";
    if (!validateComment(comment))
      newErrors.comment = "Comment must be 500 characters or less.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      await sendEmail(name, email, agent, comment);
      setModalIsOpen(false);
      setName("");
      setEmail("");
      setAgent("");
      setComment("");
      setErrors({});
      toast.success("Introduction email sent to agent!");
    } catch (error) {
      console.error("Error sending information to agent:", error);
      setErrors({ submit: "Failed to send message. Please try again." });
      toast.error("Error sending information to agent. Please try again.");
    }
  };

  if (!showButton) {
    return null;
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
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
                data-testid="contact-form-name"
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="contact-form-email"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="agent">Agent*</label>
              <select
                id="agent"
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
                required
                data-testid="contact-form-agent"
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
              {errors.agent && <p className="error-message">{errors.agent}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="comment">Comments</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Anything you'd like to share before we chat?"
                data-testid="contact-form-comment"
              ></textarea>
              {errors.comment && (
                <p className="error-message">{errors.comment}</p>
              )}
            </div>
            {errors.submit && <p className="error-message">{errors.submit}</p>}
            {agentsError && <p className="error-message">{agentsError}</p>}
            <button
              type="submit"
              className="submit-button"
              data-testid="contact-form-submit"
            >
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
