import React from "react";
import config from "../config.js";
import "./ContactForm.css";

function ContactForm(props) {

  const handleSubmit = (event) => {
    console.info('Submitting contact info')
    event.preventDefault(); 
    props.changeContactFormState("display-none");
    event.target.submit(); 
  };

  return (
    <form action={`${config.SERVER_URL}/send-email`} method="POST" onSubmit={handleSubmit}>
      <label htmlForfor="name">Name:</label>
      <input type="text" name="name" placeholder="Enter your name" required />
      <label htmlForfor="email">Email:</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
      />
      <label for="message">Message:</label>
      <input
        type="text"
        name="message"
        placeholder="Tell us about yourself"
        required
      />

      <button
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
