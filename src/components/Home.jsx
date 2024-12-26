import React, { useState } from 'react';
import './Home.css';
import axios from 'axios';

const Home = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderJobTitle: '',
    recipientName: '',
    recipientCompany: '',
    emailPurpose: '',
    customMessage: '',
    ResumeLink: '',
  });

  const [generatedEmail, setGeneratedEmail] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/main", {
        input: formData,
      });

      // Extract the reply text if it's an object (in case it's not a direct string)
      const emailText = response.data.reply?.choices?.[0]?.message?.content || 'No email generated';
      
      setGeneratedEmail(emailText); // Set the email text to display
    } catch (error) {
      console.error('Error generating email:', error);
    }
  };

  // Function to send the email using the 'mailto' protocol
  const sendEmail = () => {
    const subject = encodeURIComponent('Subject of the Email');
    const body = encodeURIComponent(generatedEmail);
    const recipient = encodeURIComponent(formData.recipientName + '@' + formData.recipientCompany); // This will depend on the recipient email address.

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="container">
      <h1 className="title">AI Email Generator</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="senderName"
          placeholder="Your Name"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="senderJobTitle"
          placeholder="Your Job Title"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="recipientName"
          placeholder="Recipient's Name"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="recipientCompany"
          placeholder="Recipient's Company"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="url"
          name="ResumeLink"
          placeholder="Resume URL"
          onChange={handleChange}
          required
          className="input"
        />
        <select 
          name="emailPurpose" 
          onChange={handleChange} 
          required
          className="select"
        >
          <option value="">Select Purpose</option>
          <option value="job_inquiry">Job Inquiry</option>
          <option value="follow_up">Follow-Up</option>
          <option value="offer">Job Offer</option>
        </select>
        <textarea
          name="customMessage"
          placeholder="Custom Message (optional)"
          onChange={handleChange}
          className="textarea"
        />
        <button type="submit" className="button">Generate Email</button>
      </form>
      {generatedEmail && (
        <div className="result-container">
          <h3 className="result-title">Generated Email:</h3>
          <pre className="result-content">{generatedEmail}</pre>
          <button onClick={sendEmail} className="button">Send Email</button>
        </div>
      )}
    </div>
  );
};

export default Home;
