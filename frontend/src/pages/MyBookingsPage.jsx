import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyBookingsPage.css';

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock Data
  const bookings = [
    {
      id: "BK-1",
      spaceName: "Mustafa İnan Library - Group Study Room 2",
      location: "Mustafa İnan Library, Ayazağa Campus",
      date: "Oct 28, 2025",
      time: "14:00 - 16:00",
      duration: "2 Hours",
      status: "upcoming"
    },
    {
      id: "BK-2",
      spaceName: "MED Building - Quiet Study Area",
      location: "MED Building, Ayazağa Campus",
      date: "Nov 02, 2025",
      time: "10:00 - 11:00",
      duration: "1 Hour",
      status: "upcoming"
    },
    {
      id: "BK-3",
      spaceName: "Central Library - Study Hall 1",
      location: "Central Library, Gümüşsuyu Campus",
      date: "Oct 15, 2025",
      time: "09:00 - 12:00",
      duration: "3 Hours",
      status: "past"
    }
  ];

  const filteredBookings = bookings.filter(b => b.status === activeTab);

  const handleCancel = (id) => {
    if(window.confirm("Are you sure you want to cancel this booking?")) {
      console.log("Cancelling booking:", id);
      alert("Booking cancelled.");
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/bookings/${id}`);
  };

  return (
    <div className="bookings-container dark">
      {/* Header */}
      <header className="bookings-header">
        <div className="brand-title" onClick={() => navigate('/')}>İTÜ Study Space Finder</div>
        
        <div className="header-nav">
          <div className="nav-links-desktop">
            <button className="nav-link" onClick={() => navigate('/')}>Find a Space</button>
            <button className="nav-link active">My Bookings</button>
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
        <button className="nav-link" onClick={() => navigate('/')} style={{textAlign:'left'}}>Find a Space</button>
        <button className="nav-link active" style={{textAlign:'left'}}>My Bookings</button>
      </div>

      {/* Main Content */}
      <main className="bookings-main">
        <div className="content-wrapper">
          
          <h1 className="page-title">My Bookings</h1>

          {/* Statistics */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total Bookings</span>
              <span className="stat-value">28</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Upcoming</span>
              <span className="stat-value">2</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Past</span>
              <span className="stat-value">22</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Cancelled</span>
              <span className="stat-value">3</span>
            </div>
          </div>

          <div className="bookings-section">
            {/* Tabs */}
            <div className="tabs-row">
              <button 
                className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming Bookings
              </button>
              <button 
                className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
                onClick={() => setActiveTab('past')}
              >
                Past Bookings
              </button>
            </div>

            {/* List */}
            <div className="bookings-list">
              {filteredBookings.length > 0 ? (
                filteredBookings.map(booking => (
                  <div key={booking.id} className="booking-card">
                    <div className="card-content">
                      <div className="card-header-row">
                        <div>
                          <h3 className="space-name">{booking.spaceName}</h3>
                          <p className="space-location">{booking.location}</p>
                        </div>
                        {activeTab === 'upcoming' && (
                          <span className="status-badge">Confirmed</span>
                        )}
                      </div>
                      
                      <div className="card-info-grid">
                        <div className="info-item">
                          <span className="material-symbols-outlined info-icon">calendar_today</span>
                          {booking.date}
                        </div>
                        <div className="info-item">
                          <span className="material-symbols-outlined info-icon">schedule</span>
                          {booking.time}
                        </div>
                        <div className="info-item">
                          <span className="material-symbols-outlined info-icon">hourglass_top</span>
                          {booking.duration}
                        </div>
                      </div>
                    </div>

                    <div className="card-actions">
                      {activeTab === 'upcoming' && (
                        <button className="btn-cancel-booking" onClick={() => handleCancel(booking.id)}>
                          Cancel Booking
                        </button>
                      )}
                      <button className="btn-view-details" onClick={() => handleViewDetails(booking.id)}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{textAlign: 'center', padding: '40px', color: '#6b7280'}}>
                  <span className="material-symbols-outlined" style={{fontSize: '48px', marginBottom: '16px'}}>event_busy</span>
                  <p>No {activeTab} bookings found.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default MyBookingsPage;