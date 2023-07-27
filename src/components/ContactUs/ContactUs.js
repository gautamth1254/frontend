import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace these values with your own email service details
    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const userId = 'YOUR_USER_ID';

    // Send email using emailjs
    emailjs.send(serviceId, templateId, { name, email, message }, userId)
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text);
        // Add your own success message or redirect the user to another page
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        // Add your own error handling or error message
      });

    // Reset the form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
