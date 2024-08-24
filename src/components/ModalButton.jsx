import { useState, useEffect, useRef } from "react";
import closeModalImg from "../assets/close-modal.avif";
import Modal from "react-modal";
import config from "../config";
import "./ModalButton.css";

export const ModalButton = ({ showDelay }) => {
  const emailInputRef = useRef();
  const agentDropdownRef = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalButtonAnimeClass, setModalButtonAnimeClass] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agent, setAgent] = useState("");
  const [comment, setComment] = useState("");
  const [showButton, setShowButton] = useState(!showDelay);

  const [nameErrorClass, setNameErrorClass] = useState("");
  const [emailErrorClass, setEmailErrorClass] = useState("");
  const [namePlaceHolder, setNamePlaceHolder] = useState("Name*");
  const [emailPlaceHolder, setEmailPlaceHolder] = useState("Email*");

  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    if (showDelay) {
      const initialTimer = setTimeout(() => {
        setShowButton(true);
      }, 8000); // Same delay as NavBar

      return () => clearTimeout(initialTimer);
    }
  }, [showDelay]);

  Modal.setAppElement("#root");

  function onSubmitButtonClick(name, email, agent, comment) {
    console.info("submitting info , ", name, email, agent, comment);
    let errorExists = false;
    if (emailIsValid(email)) {
      setEmailErrorClass("");
    } else {
      setEmailErrorClass("error");
      setEmailPlaceHolder("Please enter a valid email");
      errorExists = true;
    }
    if (nameIsValid(name)) {
      setNameErrorClass("");
    } else {
      setNameErrorClass("error");
      setNamePlaceHolder("Please enter your name");
      errorExists = true;
    }
    if (!errorExists) submitContactForm(name, email, agent, comment);
  }

  function nameIsValid(name) {
    if (name.length > 0) return true;
    else return false;
  }

  function emailIsValid(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
  }

  function submitContactForm(name, email, agent, comment) {
    setModalIsOpen(false);
    sendEmail(name, email, agent, comment);
    setName("");
    setEmail("");
    setAgent("");
    setComment("");
  }

  function onNameInputChange(name) {
    if (nameIsValid(name)) {
      setNameErrorClass("");
    } else {
      setNameErrorClass("error");
      setNamePlaceHolder("Please enter your name");
    }
    setName(name);
  }

  function onEmailInputChange(email) {
    if (emailIsValid(email)) {
      setEmailErrorClass("");
    } else {
      setEmailErrorClass("error");
      setEmailPlaceHolder("Please enter a valid email");
    }
    setEmail(email);
  }

  function openModal() {
    console.log("opening up modal");
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

  function modalOnClick() {
    setModalIsOpen(true);
    setModalButtonAnimeClass("pause-animation");
    openModal();
  }

  function closeContactForm() {
    closeModal();
    setModalIsOpen(false);
    setName("");
    setEmail("");
    setAgent("");
    setComment("");
    setEmailErrorClass("");
    setNameErrorClass("");
    setNamePlaceHolder("Name*");
    setEmailPlaceHolder("Email*");
  }

  function handleNameKeyPress(event) {
    if (event.key === "Enter") {
      // Focus on next input
      emailInputRef.current.focus();
    }
  }

  function handleEmailKeyPress(event) {
    if (event.key === "Enter") {
      agentDropdownRef.current.focus();
    }
  }

  async function sendEmail(name, email, agent, comment) {
    try {
      const response = await fetch(`${config.SERVER_URL}/api/v1/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        },
        body: JSON.stringify({
          name,
          email,
          agent,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.info("response from sending email", data);
    } catch (error) {
      console.error("Error in sending email, ", error);
    }
  }
  if (!showButton) {
    return null;
  }

  return (
    <>
      <button
        className={`modal-button ${showButton ? "fade-in" : ""}`}
        onClick={() => modalOnClick()}
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
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => closeContactForm()}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.80)",
            zIndex: 2,
          },
        }}
      >
        <div className="modal-heading">
          <h1 className="title-contact">Let's Connect</h1>
          <p>Fill out the details below and we'll reach out to you shortly!</p>
          <img
            src={closeModalImg}
            alt="Close Modal"
            className="close-modal-button"
            onClick={() => closeContactForm()}
          />
        </div>
        <div className="modal-element">
          <input
            className={`modal-input ${nameErrorClass}`}
            placeholder={namePlaceHolder}
            type="text"
            value={name}
            onInput={(e) => onNameInputChange(e.target.value)}
            onKeyDown={(e) => handleNameKeyPress(e)}
            required
          />
        </div>
        <div className="modal-element">
          <input
            className={`modal-input ${emailErrorClass}`}
            placeholder={emailPlaceHolder}
            type="email"
            value={email}
            onInput={(e) => onEmailInputChange(e.target.value)}
            onKeyDown={(e) => handleEmailKeyPress(e)}
            required
            ref={emailInputRef}
          />
        </div>
        <div className="modal-element">
          <select
            className="select-agents"
            name="selectAgents"
            value={agent}
            onChange={(e) => setAgent(e.target.value)}
            ref={agentDropdownRef}
          >
            <option value="" disabled>
              Agent
            </option>
            <option value="Jacob Williams">Jacob Williams</option>
            <option value="Mathews Thomas"> Mathews Thomas</option>
            <option value="Jose Ancheril">Jose Ancheril</option>
            <option value="Shazzat Tanvir">Shazzat Tanvir</option>
            <option value="Karen Roos">Karen Roos</option>
            <option value="Kerri Kaylor">Kerri Kaylor</option>
          </select>
        </div>
        <div className="modal-element">
          <textarea
            className="modal-textarea"
            rows="4"
            placeholder="Anything you'd like to share before we chat?"
            value={comment}
            onInput={(e) => setComment(e.target.value)}
          >
            {" "}
          </textarea>
        </div>
        <div className="modal-element">
          <button
            className="submit-button"
            onClick={() => onSubmitButtonClick(name, email, agent, comment)}
          >
            {" "}
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
};
