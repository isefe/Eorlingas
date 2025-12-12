import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { spaceService } from '../services/apiService';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  // Data State
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    campus: '',
    building: '',
    roomType: '',
    noiseLevel: '',
    capacity: 1,
    availableNow: false
  });

  // Mock Fetch (Replace with actual API call)
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        setLoading(true);
        const response = await spaceService.getAllSpaces();
        if (response.data.success) {
          setSpaces(response.data.data.spaces);
        }
      } catch (err) {
        console.error("API Error:", err);
        // Fallback Mock Data for Demo
        setSpaces([
          {
            spaceId: 1,
            spaceName: "Mustafa İnan Library - Study Room 2",
            building: { buildingName: "Mustafa İnan Library", campus: { campusName: "Ayazağa Campus" } },
            capacity: 25,
            roomType: "Group Study",
            noiseLevel: "Collaborative",
            status: "Available",
            operatingHours: { weekday: { end: "22:00" } }
          },
          {
            spaceId: 2,
            spaceName: "MED Building - Quiet Study Area",
            building: { buildingName: "MED Building", campus: { campusName: "Ayazağa Campus" } },
            capacity: 40,
            roomType: "Individual",
            noiseLevel: "Silent",
            status: "Occupied",
            operatingHours: { weekday: { end: "18:00" } }
          },
          // Add more mock items if needed based on HTML
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchSpaces();
  }, []);

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    // Map HTML IDs to state keys
    const keyMap = {
      'campus-filter': 'campus',
      'building-filter': 'building',
      'room-type-filter': 'roomType',
      'noise-level-filter': 'noiseLevel'
    };
    setFilters(prev => ({ ...prev, [keyMap[id]]: value }));
  };

  const handleCapacityChange = (e) => {
    setFilters(prev => ({ ...prev, capacity: parseInt(e.target.value) }));
  };

  // --- FIX 2: Simplified Toggle Handler ---
  const handleAvailableToggle = () => {
    setFilters(prev => ({ ...prev, availableNow: !prev.availableNow }));
  };

  // Filter Logic
  const filteredSpaces = spaces.filter(space => {
    // 1. Search Term
    if (searchTerm && !space.spaceName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    // 2. Dropdown Filters (Simple exact match logic)
    // Note: In real app, match values like 'ayazaga' to 'Ayazağa Campus' mapping
    // For now, we skip if filter is empty string
    
    // 3. Capacity
    if (space.capacity < filters.capacity) return false;

    // 4. Available Now
    if (filters.availableNow && space.status !== 'Available') return false;

    return true;
  });

  return (
    <div className="landing-container dark">
      {/* Header */}
      <header className="landing-header">
        <div className="brand-title">İTÜ Study Space Finder</div>
        
        <div className="header-nav">
          <div className="nav-links-desktop">
            <button className="nav-link" onClick={() => navigate('/profile')}>My Bookings</button>
          </div>
          
          {/* Added Auth Buttons */}
          <div className="auth-buttons">
            <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
            <button className="btn-signup" onClick={() => navigate('/register')}>Sign Up</button>
          </div>
          
          <div className="user-avatar" onClick={() => navigate('/login')}>
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>
      </header>

      <main className="landing-main">
        {/* Sidebar Filters */}
        <aside className="filter-sidebar">
          <div className="filter-header">
            <h2>Filters</h2>
            <p>Refine your search.</p>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">General</h3>
            <div className="search-input-wrapper">
              <input 
                type="text" 
                placeholder="Search by name..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="material-symbols-outlined search-icon">search</span>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Location</h3>
            <select id="campus-filter" className="filter-select" onChange={handleFilterChange}>
              <option value="">All Campuses</option>
              <option value="Ayazağa Campus">Ayazağa Campus</option>
              <option value="Gümüşsuyu Campus">Gümüşsuyu Campus</option>
              <option value="Taşkışla Campus">Taşkışla Campus</option>
            </select>
            <select id="building-filter" className="filter-select" onChange={handleFilterChange}>
              <option value="">All Buildings</option>
              <option value="Library">Kütüphane</option>
              <option value="MED">MED</option>
              <option value="Insaat">İnşaat Fakültesi</option>
            </select>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Room Specifications</h3>
            <select id="room-type-filter" className="filter-select" onChange={handleFilterChange}>
              <option value="">All Room Types</option>
              <option value="Group Study">Group Study</option>
              <option value="Individual">Individual</option>
              <option value="Private Room">Private Room</option>
            </select>
            <select id="noise-level-filter" className="filter-select" onChange={handleFilterChange}>
              <option value="">All Noise Levels</option>
              <option value="Silent">Silent</option>
              <option value="Quiet">Quiet</option>
              <option value="Collaborative">Collaborative</option>
            </select>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Capacity</h3>
            <div className="capacity-wrapper">
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={filters.capacity} 
                className="capacity-slider"
                onChange={handleCapacityChange}
              />
              <span className="capacity-label">{filters.capacity}+</span>
            </div>
            
            {/* FIX 2: Correct onClick handler */}
            <div className="toggle-wrapper" onClick={handleAvailableToggle}>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={filters.availableNow}
                  readOnly // Controlled by parent div
                />
                <span className="slider"></span>
              </label>
              <span className="toggle-label">Available Now</span>
            </div>
          </div>

          <div className="filter-actions">
            <button className="btn-apply">Apply Filters</button>
            <button className="btn-reset">Reset</button>
          </div>
        </aside>

        {/* Content Area */}
        <div className="content-area">
          <div className="content-header">
            <h1>Study Space Details and Availability</h1>
            <p>Search, filter, and discover the perfect spot to study across all İTÜ campuses.</p>
          </div>

          <div className="controls-bar">
            <p className="results-count">
              Showing <span style={{fontWeight: 700, color: 'white'}}>1-{filteredSpaces.length}</span> of <span style={{fontWeight: 700, color: 'white'}}>{spaces.length}</span> results
            </p>
            <div className="view-toggle">
              <button className="view-btn active">
                <span className="material-symbols-outlined" style={{fontSize: '1.25rem'}}>list</span> List
              </button>
              <button className="view-btn">
                <span className="material-symbols-outlined" style={{fontSize: '1.25rem'}}>map</span> Map
              </button>
            </div>
          </div>

          {/* Spaces Grid */}
          <div className="spaces-grid">
            {filteredSpaces.map(space => (
              <div key={space.spaceId} className="space-card">
                
                {/* FIX 1: Availability Badge */}
                {space.status === 'Available' ? (
                  <div className="status-badge available">
                    <div className="dot"></div> Available Now
                  </div>
                ) : (
                  <div className="status-badge booked">
                    <div className="dot"></div> Fully Booked
                  </div>
                )}

                <div className="card-header">
                  <h3 className="card-title">{space.spaceName}</h3>
                  <p className="card-subtitle">{space.building?.buildingName}, {space.building?.campus?.campusName}</p>
                </div>

                <div className="card-details">
                  <div className="detail-item">
                    <span className="material-symbols-outlined">groups</span>
                    <span>{space.capacity} Capacity</span>
                  </div>
                  <div className="detail-item">
                    <span className="material-symbols-outlined">meeting_room</span>
                    <span>{space.roomType}</span>
                  </div>
                  <div className="detail-item">
                    <span className="material-symbols-outlined">graphic_eq</span>
                    <span>{space.noiseLevel}</span>
                  </div>
                  <div className="detail-item">
                    <span className="material-symbols-outlined">schedule</span>
                    <span>Until {space.operatingHours?.weekday?.end || '22:00'}</span>
                  </div>
                </div>

                <button 
                  className="view-details-btn"
                  onClick={() => navigate(`/spaces/${space.spaceId}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <p className="pagination-text">
              Showing <span style={{fontWeight: 600, color: '#e5e7eb'}}>1</span> to <span style={{fontWeight: 600, color: '#e5e7eb'}}>{filteredSpaces.length}</span> of <span style={{fontWeight: 600, color: '#e5e7eb'}}>{spaces.length}</span> results
            </p>
            <div style={{display: 'flex'}}>
              <button className="page-btn"><span className="material-symbols-outlined">chevron_left</span></button>
              <button className="page-btn"><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;