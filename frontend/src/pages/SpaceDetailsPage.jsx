import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { spaceService } from '../services/apiService';
import './SpaceDetailsPage.css';

const SpaceDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check auth status
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Fetch Logic
  useEffect(() => {
    // Mock Data
    setSpace({
      spaceName: "Mustafa İnan Library - Group Study Room 2",
      location: "Room 204, Mustafa İnan Library, Ayazağa Campus",
      capacity: 25,
      roomType: "Group Study",
      noiseLevel: "Collaborative",
      floor: "2nd Floor",
      description: "A spacious and bright group study area designed for collaboration. Features large tables, comfortable seating, and ample natural light, making it an ideal spot for project work and team discussions.",
      amenities: [
        { name: "High-Speed Wi-Fi", icon: "wifi", positive: true },
        { name: "Power Outlets", icon: "power", positive: true },
        { name: "Whiteboard", icon: "edit", positive: true },
        { name: "Projector", icon: "videocam", positive: true },
        { name: "No Printer Access", icon: "print_disabled", positive: false },
        { name: "Public Computers", icon: "desktop_windows", positive: true }
      ],
      schedule: [
        { time: "09:00 - 10:00", status: "Booked" },
        { time: "10:00 - 11:00", status: "Booked" },
        { time: "11:00 - 12:00", status: "Available" },
        { time: "12:00 - 13:00", status: "Available" },
        { time: "13:00 - 14:00", status: "Booked" },
        { time: "14:00 - 15:00", status: "Available" }
      ]
    });
    setLoading(false);
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!space) return <div>Space not found</div>;

  return (
    <div className="details-page-container dark">
      {/* Header */}
      <header className="details-header">
        <div className="brand-title" onClick={() => navigate('/')}>İTÜ Study Space Finder</div>
        
        <div className="header-nav">
          <div className="nav-links-desktop">
            <button className="nav-link" onClick={() => navigate('/')}>Find a Space</button>
            <button className="nav-link" onClick={() => navigate('/profile')}>My Bookings</button>
            
            {!isLoggedIn ? (
              <button className="auth-btn-header" onClick={() => navigate('/login')}>Log In</button>
            ) : (
              <div className="auth-btn-header" style={{backgroundColor: '#374151', cursor:'default'}}>Logged In</div>
            )}
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
        <button onClick={() => navigate('/')} className="nav-link" style={{textAlign:'left'}}>Find a Space</button>
        <button className="nav-link" onClick={() => navigate('/profile')} style={{textAlign:'left'}}>My Bookings</button>
        {!isLoggedIn && (
          <button onClick={() => navigate('/login')} className="nav-link" style={{textAlign:'left', color: 'var(--primary-color)'}}>Log In</button>
        )}
      </div>

      {/* Main Content */}
      <main className="details-main">
        <div className="content-wrapper">
          
          <div className="details-grid">
            
            {/* Left Column: Details */}
            <div className="space-info-col">
              
              {/* Title Section */}
              <div className="title-section">
                <h1 className="space-title">{space.spaceName}</h1>
                <p className="space-location">{space.location}</p>
              </div>

              {/* Stats Grid */}
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="material-symbols-outlined stat-icon">groups</span>
                  <div className="stat-text">
                    <span className="stat-label">Capacity</span>
                    <span className="stat-value">{space.capacity} People</span>
                  </div>
                </div>
                <div className="stat-item">
                  <span className="material-symbols-outlined stat-icon">meeting_room</span>
                  <div className="stat-text">
                    <span className="stat-label">Room Type</span>
                    <span className="stat-value">{space.roomType}</span>
                  </div>
                </div>
                <div className="stat-item">
                  <span className="material-symbols-outlined stat-icon">graphic_eq</span>
                  <div className="stat-text">
                    <span className="stat-label">Noise Level</span>
                    <span className="stat-value">{space.noiseLevel}</span>
                  </div>
                </div>
                <div className="stat-item">
                  <span className="material-symbols-outlined stat-icon">location_on</span>
                  <div className="stat-text">
                    <span className="stat-label">Floor</span>
                    <span className="stat-value">{space.floor}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="info-block">
                <h3>Description</h3>
                <p className="description-text">{space.description}</p>
              </div>

              {/* Amenities */}
              <div className="info-block">
                <h3>Amenities</h3>
                <div className="amenities-grid">
                  {space.amenities.map((item, index) => (
                    <div key={index} className="amenity-item">
                      <span className={`material-symbols-outlined amenity-icon ${!item.positive ? 'negative' : ''}`}>
                        {item.icon}
                      </span>
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Accessibility */}
              <div className="info-block">
                <h3>Accessibility</h3>
                <div className="amenities-grid">
                  <div className="amenity-item">
                    <span className="material-symbols-outlined amenity-icon">accessible</span>
                    Wheelchair Accessible
                  </div>
                  <div className="amenity-item">
                    <span className="material-symbols-outlined amenity-icon">wc</span>
                    Accessible Restrooms
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="info-block">
                <h3>Operating Hours</h3>
                <div className="hours-list">
                  <div className="hours-row">
                    <span>Monday - Friday</span>
                    <span style={{fontWeight: 500}}>08:00 - 22:00</span>
                  </div>
                  <div className="hours-row">
                    <span>Saturday - Sunday</span>
                    <span style={{fontWeight: 500}}>10:00 - 20:00</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Availability Sidebar */}
            <div className="sidebar-col">
              <div className="availability-card">
                <h3 className="card-title">Availability</h3>
                
                <div className="input-group">
                  <label className="stat-label" style={{marginBottom:'8px', display:'block'}}>Select a Date</label>
                  <div className="date-input-wrapper">
                    <input 
                      type="date" 
                      className="date-input" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <span className="material-symbols-outlined calendar-icon">calendar_today</span>
                  </div>
                </div>

                <div>
                  <p style={{fontWeight: 500, marginBottom: '12px'}}>Today's Schedule</p>
                  <div className="schedule-list">
                    {space.schedule.map((slot, index) => (
                      <div key={index} className="schedule-item">
                        <span className="time-text">{slot.time}</span>
                        <span className={`status-text ${slot.status.toLowerCase()}`}>
                          {slot.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conditional Login Box */}
                {!isLoggedIn ? (
                  <div className="login-prompt-box">
                    <span className="material-symbols-outlined lock-icon">lock</span>
                    <p className="prompt-text">You must be logged in to book a space</p>
                  </div>
                ) : (
                  <button className="auth-btn-header" style={{width: '100%'}}>
                    Book Selected Slot
                  </button>
                )}

              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default SpaceDetailsPage;