import React, { useState } from 'react';
import './ClientServices.css';

const ClientServices = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // Appointment Form State
  const [appointment, setAppointment] = useState({
    name: '',
    email: '',
    date: '',
    type: 'virtual' // virtual or instore
  });

  // Contact Form State
  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment Request Sent!\nType: ${appointment.type}\nDate: ${appointment.date}\nTime: ${selectedSlot}`);
    // Here you would integrate with backend
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Message Sent! We will contact you at ${contact.email} shortly.`);
  };

  const faqData = [
    {
      question: "How do I schedule a private styling session?",
      answer: "You can book a private styling appointment using the form above. We offer both virtual consultations and in-store experiences at our flagship boutiques."
    },
    {
      question: "What is your return policy?",
      answer: "We offer complimentary returns within 30 days of purchase. Items must be unworn, with original tags and packaging intact."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, MAISON ships to over 50 countries worldwide. Express delivery ensures your items arrive within 3-5 business days."
    },
    {
      question: "Can I alter my order after it has been placed?",
      answer: "Please contact our Concierge immediately. If your order has not yet been processed, we will do our best to accommodate your request."
    }
  ];

  return (
    <div className="client-services-container">
      <header className="services-header">
        <h1 className="services-title">Client Services</h1>
        <p className="services-subtitle">Dedicated Assistance & Personalized Care</p>
      </header>

      <div className="services-content">
        <div className="services-grid">
          {/* Appointment Section */}
          <section className="service-section">
            <h2 className="section-title">Private Appointments</h2>
            <form onSubmit={handleAppointmentSubmit}>
              <div className="form-group">
                <label className="form-label">Service Type</label>
                <select 
                  className="form-select"
                  value={appointment.type}
                  onChange={(e) => setAppointment({...appointment, type: e.target.value})}
                >
                  <option value="virtual">Virtual Styling Consultation</option>
                  <option value="instore">In-Store Private Shopping</option>
                  <option value="fitting">Personal Fitting Session</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Preferred Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  required
                  onChange={(e) => setAppointment({...appointment, date: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Available Times</label>
                <div className="appointment-slots">
                  {['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'].map(time => (
                    <div 
                      key={time}
                      className={`time-slot ${selectedSlot === time ? 'selected' : ''}`}
                      onClick={() => setSelectedSlot(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  onChange={(e) => setAppointment({...appointment, name: e.target.value})}
                />
              </div>
               <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  required 
                  onChange={(e) => setAppointment({...appointment, email: e.target.value})}
                />
              </div>

              <button type="submit" className="submit-btn" disabled={!selectedSlot}>
                Request Appointment
              </button>
            </form>
          </section>

          {/* Contact Form Section */}
          <section className="service-section">
            <h2 className="section-title">Concierge Service</h2>
            <form onSubmit={handleContactSubmit}>
               <div className="form-group">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required
                  value={contact.name}
                  onChange={(e) => setContact({...contact, name: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  required
                  value={contact.email}
                  onChange={(e) => setContact({...contact, email: e.target.value})}
                />
              </div>

               <div className="form-group">
                <label className="form-label">Subject</label>
                <select 
                  className="form-select"
                  value={contact.subject}
                  onChange={(e) => setContact({...contact, subject: e.target.value})}
                >
                  <option value="">Select a Topic</option>
                  <option value="order">Order Inquiry</option>
                  <option value="product">Product Information</option>
                  <option value="press">Press & Partnerships</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea 
                  className="form-textarea" 
                  required
                  value={contact.message}
                  onChange={(e) => setContact({...contact, message: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="faq-container">
          <header className="faq-header">
             <h2 className="section-title" style={{border: 'none', display: 'inline-block'}}>Frequently Asked Questions</h2>
          </header>
          
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => toggleFaq(index)}
                aria-expanded={activeFaq === index}
              >
                {item.question}
                <span className={`faq-icon ${activeFaq === index ? 'active' : ''}`}>
                  +
                </span>
              </button>
              <div className={`faq-answer ${activeFaq === index ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Locations */}
      <section className="locations-section">
        <div className="locations-grid">
            <div className="location-item">
                <div className="location-city">Paris</div>
                <div className="location-address">31 Rue Cambon<br/>75001 Paris<br/>France</div>
            </div>
             <div className="location-item">
                <div className="location-city">New York</div>
                <div className="location-address">108 Wooster St<br/>New York, NY 10012<br/>United States</div>
            </div>
             <div className="location-item">
                <div className="location-city">Tokyo</div>
                <div className="location-address">5-2-6 Minami-Aoyama<br/>Minato-ku, Tokyo<br/>Japan</div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ClientServices;
