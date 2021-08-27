import './ContactForm.css';

function ContactForm() {
    return (
      <form action="http://localhost:3001/send-email" method="POST">
          <label for="name">Name:</label>
          <input type="text" name="name" placeholder="Enter your name" required />
          <label for="email">Email:</label>
          <input type="email" name="email" placeholder="Enter your email" required />
          <label for="message">Message:</label>
          <input type="text" name="message" placeholder="Tell us about yourself" required />

          <button type="submit">Submit</button>
      </form>  
    );
}

export default ContactForm;