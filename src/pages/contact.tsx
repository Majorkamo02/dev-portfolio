import React, { useState } from 'react';
import '../css/contact.css';

function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'Valid email required';
    if (!form.phone.match(/^\d{10,15}$/)) newErrors.phone = 'Valid phone required (10-15 digits)';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("https://formspree.io/f/mwpkdpkw", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        });
        if (response.ok) {
          setSubmitted(true);
          setForm({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
          });
        } else {
          setErrors({ form: "Something went wrong. Please try again." });
        }
      } catch {
        setErrors({ form: "Network error. Please try again." });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="contact-container">
      <div className="backdrop"></div>
      <form
        className="contact-form"
        noValidate
        onSubmit={handleSubmit}
      >
        <h1>Contact Me</h1>
        <div className="form-row">
          <div className="form-group" style={{minWidth: 0}}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div className="form-group" style={{minWidth: 0}}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={form.phone}
            onChange={handleChange}
            required
            pattern="\d{10,15}"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>
        {errors.form && <div className="error">{errors.form}</div>}
        <button type="submit" className="submit-btn">Send Message</button>
        {submitted && <div className="success">Success! Thank you for reaching out, I will get back to you as soon as possible!</div>}
      </form>
    </div>
  );
}

export default Contact;