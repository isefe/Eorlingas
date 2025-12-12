import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SpaceManagerDashboard.css';

const SpaceManagerDashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 1. Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'All',
    campus: 'All',
    building: 'All',
    capacity: 'All'
  });

  // Mock Data
  const spaces = [
    { id: 1, name: "Mustafa İnan Library - Group Study Room 2", building: "Mustafa İnan Library", campus: "Ayazağa", capacity: 25, status: "Available" },
    { id: 2, name: "MED Building - Quiet Study Area", building: "MED Building", campus: "Ayazağa", capacity: 40, status: "Available" },
    { id: 3, name: "Computer Engineering Faculty - Study Room 2", building: "Computer Engineering Faculty", campus: "Ayazağa", capacity: 12, status: "Maintenance" },
    { id: 4, name: "Electrical Engineering Faculty - Study Room 1", building: "Electrical Engineering Faculty", campus: "Ayazağa", capacity: 20, status: "Available" },
    { id: 5, name: "Central Library - Study Hall 1", building: "Central Library", campus: "Gümüşsuyu", capacity: 30, status: "Deleted" },
  ];

  // 2. Filter Logic
  const filteredSpaces = spaces.filter(space => {
    // Search Term Match
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Dropdown Matches
    const matchesStatus = filters.status === 'All' || space.status === filters.status;
    const matchesCampus = filters.campus === 'All' || space.campus === filters.campus;
    const matchesBuilding = filters.building === 'All' || space.building === filters.building;
    
    // Simple Capacity Logic (For demo: matches exact or '20+' logic if you implemented ranges)
    // Here we just check exact match for simplicity, or skip if 'All'
    const matchesCapacity = filters.capacity === 'All' || space.capacity.toString() === filters.capacity;

    return matchesSearch && matchesStatus && matchesCampus && matchesBuilding && matchesCapacity;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ status: 'All', campus: 'All', building: 'All', capacity: 'All' });
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this space?")) {
      console.log("Delete space:", id);
    }
  };

  return (
    <div className="manager-container dark">
      {/* Header */}
      <header className="manager-header">
        <div className="brand-title" onClick={() => navigate('/')}>İTÜ Study Space Finder</div>
        
        <div className="header-nav">
          <div className="nav-links-desktop">
            <button className="nav-link" onClick={() => navigate('/space-manager/create-space')}>Create Space</button>
            <button className="nav-link" onClick={() => navigate('/space-manager/edit/:id')}>Edit Space</button>
          </div>
          
          <div className="user-avatar-small">
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
        <button className="nav-link active" style={{textAlign:'left'}}>Dashboard</button>
        <button className="nav-link" style={{textAlign:'left'}}>Spaces</button>
      </div>

      {/* Main Content */}
      <main className="manager-main">
        <div className="content-wrapper">
          
          {/* Page Heading */}
          <div className="page-heading">
            <h1 className="page-title">Space Management Dashboard</h1>
            <button className="create-btn" onClick={() => navigate('/admin/create-space')}>
              <span className="material-symbols-outlined" style={{fontSize:'1.25rem'}}>add</span>
              Create New Space
            </button>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total Spaces</span>
              <span className="stat-value">{spaces.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Available</span>
              <span className="stat-value">{spaces.filter(s => s.status === 'Available').length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">In Maintenance</span>
              <span className="stat-value">{spaces.filter(s => s.status === 'Maintenance').length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Deleted</span>
              <span className="stat-value">{spaces.filter(s => s.status === 'Deleted').length}</span>
            </div>
          </div>

          {/* Filter Panel */}
          <div className="filter-panel">
            <div className="filter-row">
              <div className="search-wrapper">
                <span className="material-symbols-outlined search-icon">search</span>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search by space name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* 3. Replaced Buttons with Functional Selects */}
              <div className="filter-select-wrapper">
                <select 
                  className="filter-btn" 
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="All">Status: All</option>
                  <option value="Available">Available</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Deleted">Deleted</option>
                </select>
              </div>
              
              <div className="filter-select-wrapper">
                <select 
                  className="filter-btn"
                  value={filters.campus}
                  onChange={(e) => handleFilterChange('campus', e.target.value)}
                >
                  <option value="All">Campus: All</option>
                  <option value="Ayazağa">Ayazağa</option>
                  <option value="Gümüşsuyu">Gümüşsuyu</option>
                  <option value="Taşkışla">Taşkışla</option>
                  <option value="Maçka">Maçka</option>
                </select>
              </div>

              <div className="filter-select-wrapper">
                <select 
                  className="filter-btn"
                  value={filters.building}
                  onChange={(e) => handleFilterChange('building', e.target.value)}
                >
                  <option value="All">Building: All</option>
                  <option value="Mustafa İnan Library">Mustafa İnan Library</option>
                  <option value="MED Building">MED Building</option>
                  <option value="Computer Engineering Faculty">Computer Engineering</option>
                  <option value="Electrical Engineering Faculty">Electrical Engineering</option>
                  <option value="Central Library">Central Library</option>
                </select>
              </div>

              <div className="filter-select-wrapper">
                <select 
                  className="filter-btn"
                  value={filters.capacity}
                  onChange={(e) => handleFilterChange('capacity', e.target.value)}
                >
                  <option value="All">Capacity: All</option>
                  <option value="12">12</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                </select>
              </div>
              
              <button className="clear-btn" onClick={clearFilters}>Clear Filters</button>
            </div>
          </div>

          {/* Spaces Table */}
          <div className="table-container">
            <div className="table-scroll-wrapper">
              <table className="space-table">
                <thead>
                  <tr>
                    <th style={{width: '25%'}}>Space Name</th>
                    <th style={{width: '15%'}}>Building</th>
                    <th style={{width: '15%'}}>Campus</th>
                    <th style={{width: '10%'}}>Capacity</th>
                    <th style={{width: '15%'}}>Status</th>
                    <th style={{width: '20%', textAlign: 'right'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSpaces.length > 0 ? (
                    filteredSpaces.map((space) => (
                      <tr key={space.id}>
                        <td>{space.name}</td>
                        <td style={{color: '#9ca3af'}}>{space.building}</td>
                        <td style={{color: '#9ca3af'}}>{space.campus}</td>
                        <td style={{color: '#9ca3af'}}>{space.capacity}</td>
                        <td>
                          <div className={`status-badge ${space.status.toLowerCase()}`}>
                            <div className="status-dot"></div>
                            {space.status}
                          </div>
                        </td>
                        <td style={{textAlign: 'right'}}>
                          <div style={{display: 'flex', justifyContent: 'flex-end', gap: '8px'}}>
                            <button className="action-btn" onClick={() => navigate('/space-manager/edit/:id')}>
                              <span className="material-symbols-outlined" style={{fontSize: '18px'}}>edit</span>
                            </button>
                            <button className="action-btn" onClick={() => handleDelete(space.id)}>
                              <span className="material-symbols-outlined" style={{fontSize: '18px'}}>delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{textAlign: 'center', padding: '32px', color: '#6b7280'}}>
                        No spaces found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="pagination-bar">
            <span className="page-info">
              Showing <span style={{fontWeight: 700, color: 'var(--text-light)'}}>
                {filteredSpaces.length > 0 ? 1 : 0}-{filteredSpaces.length}
              </span> of <span style={{fontWeight: 700, color: 'var(--text-light)'}}>{spaces.length}</span>
            </span>
            
            <div className="pagination-controls">
              <button className="page-nav-btn" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              
              <div style={{display:'flex', gap:'4px'}}>
                <button className="page-nav-btn active">1</button>
              </div>
              
              <button className="page-nav-btn" disabled>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SpaceManagerDashboard;