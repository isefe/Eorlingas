import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './BookingDetailsPage.css';

const BookingDetailsPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock Data
  const booking = {
    id: "BK-12345",
    status: "Confirmed",
    spaceName: "Mustafa İnan Library - Group Study Room 2",
    location: "Room 204, 2nd Floor",
    building: "Mustafa İnan Library",
    campus: "Ayazağa",
    capacity: "25 People",
    peopleCount: 4,
    date: "October 26, 2025",
    time: "14:00 - 16:00",
    duration: "2 hours",
    dateBooked: "October 20, 2025, 11:32",
    purpose: "Group Project"
  };

  const handleCancel = () => {
    if(window.confirm("Are you sure you want to cancel this booking?")) {
      alert("Booking cancelled successfully.");
      navigate('/profile');
    }
  };

  return (
    <div className="booking-container dark">
      {/* Header */}
      <header className="booking-header">
        <div className="brand-title" onClick={() => navigate('/')}>İTÜ Study Space Finder</div>
        
        <div className="header-nav">
          <div className="nav-links-desktop">
            <button className="nav-link" onClick={() => navigate('/bookings')}>My Bookings</button>
            <button className="nav-link" onClick={() => navigate('/')}>Find a Space</button>
          </div>
          
          <div className="user-avatar-small" onClick={() => navigate('/profile')}>
            <span className="material-symbols-outlined">person</span>
          </div>

          <button 
            className="hamburger-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined" style={{fontSize: '28px'}}>menu</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="nav-link" onClick={() => navigate('/admin')} style={{textAlign:'left'}}>Dashboard</button>
        <button className="nav-link" onClick={() => navigate('/profile')} style={{textAlign:'left'}}>My Bookings</button>
        <button className="nav-link" onClick={() => navigate('/')} style={{textAlign:'left'}}>Find a Space</button>
      </div>

      {/* Main Content */}
      <main className="booking-main">
        <div className="content-wrapper">
          
          <h1 className="page-title">Booking Details</h1>

          <div className="details-card">
            
            <div className="card-body">
              {/* Card Header */}
              <div className="card-header-row">
                <h2 className="confirmation-number">Confirmation #{booking.id}</h2>
                <div className="status-badge">
                  <div className="status-dot"></div>
                  <span className="status-text">{booking.status}</span>
                </div>
              </div>

              {/* Grid Content */}
              <div className="details-grid">
                
                {/* Section 1: Space Info */}
                <div className="details-section">
                  <h3 className="section-title">Space Information</h3>
                  <div className="info-rows">
                    <div className="info-row">
                      <span className="info-label">Space Name</span>
                      <span className="info-value">{booking.spaceName}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Location</span>
                      <span className="info-value">{booking.location}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Building</span>
                      <span className="info-value">{booking.building}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Campus</span>
                      <span className="info-value">{booking.campus}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Room Capacity</span>
                      <span className="info-value">{booking.capacity}</span>
                    </div>
                  </div>
                </div>

                {/* Section 2: Booking Schedule */}
                <div className="details-section">
                  <h3 className="section-title">Booking Schedule</h3>
                  <div className="info-rows">
                    <div className="info-row">
                      <span className="info-label">Date</span>
                      <span className="info-value">{booking.date}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Time</span>
                      <span className="info-value">{booking.time}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Duration</span>
                      <span className="info-value">{booking.duration}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Group Size</span>
                      <span className="info-value">{booking.peopleCount} People Scheduled</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Additional Info (Full Width) */}
                <div className="details-section full-width-section">
                  <h3 className="section-title">Additional Information</h3>
                  <div className="info-rows">
                    <div className="info-row">
                      <span className="info-label">Date Booked</span>
                      <span className="info-value">{booking.dateBooked}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Purpose</span>
                      <span className="info-value">{booking.purpose}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="card-footer">
              <button className="btn-cancel" onClick={handleCancel}>
                <span className="material-symbols-outlined">delete</span>
                Cancel Booking
              </button>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default BookingDetailsPage;