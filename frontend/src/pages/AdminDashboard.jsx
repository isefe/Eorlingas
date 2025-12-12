import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBuilding, setFilterBuilding] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]);

  const [rooms, setRooms] = useState([
    { id: 1, name: "Lecture Hall A", location: "4570", capacity: 28, status: "Available" },
    { id: 2, name: "Comp Lab 1", location: "1070", capacity: 28, status: "Maintenance" },
    { id: 3, name: "Meeting Room 3", location: "2070", capacity: 28, status: "Occupied" },
    { id: 4, name: "Study Zone B", location: "2000", capacity: 23, status: "Available" },
    { id: 5, name: "Quiet Room", location: "2070", capacity: 28, status: "Available" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === id ? { ...room, status: newStatus } : room
      )
    );
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          room.location.includes(searchTerm);
    const matchesBuilding = filterBuilding === 'All' || room.location === filterBuilding;
    const matchesStatus = filterStatus === 'All' || room.status === filterStatus;
    
    return matchesSearch && matchesBuilding && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch(status) {
      case 'Available': return 'status-available';
      case 'Occupied': return 'status-occupied';
      case 'Maintenance': return 'status-maintenance';
      default: return '';
    }
  };

  return (
    <div className="dashboard-container dark"> 
      
      {/* Header */}
      <header className="dashboard-header">
        <div className="brand-title" onClick={() => navigate('/')}>İTÜ Study Space Finder</div>
        
        {/* Desktop Nav */}
        <div className="header-nav">
          <div className="nav-links-desktop">
            <button className="nav-link" onClick={() => navigate('/admin/users')}>User Management</button>
            <button className="nav-link" onClick={() => navigate('/admin/audit-logs')}>Audit Logs</button>
          </div>

          <div className="user-avatar-small" onClick={() => navigate('/profile')}>
            <span className="material-symbols-outlined">person</span>
          </div>
          
          {/* Hamburger Button (Mobile Only) */}
          <button 
            className="hamburger-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined" style={{fontSize: '28px'}}>menu</span>
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <a className="nav-link" href="#">Spaces</a>
        <a className="nav-link" href="#">Bookings</a>
        <button onClick={() => navigate('/')} className="nav-link" style={{textAlign:'left'}}>Home</button>
      </div>

      {/* Main Content */}
      <main className="dashboard-main">
        
        {/* Page Heading & Calendar */}
        <div className="page-header">
          <h1 className="page-title">Admin Dashboard</h1>
          
          {/* Functional Date Picker */}
          <div className="date-picker-group">
            <span className="material-symbols-outlined" style={{color:'#9ca3af'}}>calendar_today</span>
            <input 
              type="date" 
              className="date-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="date-separator">-</span>
            <input 
              type="date" 
              className="date-input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Active Users</span>
            <span className="stat-value">1,245</span>
            <span className="stat-change" style={{color: 'var(--status-green)'}}>+5.2%</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Spaces</span>
            <span className="stat-value">{rooms.length}</span>
            <span className="stat-change" style={{color: 'var(--status-green)'}}>+2 This Month</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Bookings</span>
            <span className="stat-value">5,678</span>
            <span className="stat-change" style={{color: 'var(--status-green)'}}>+15.8%</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Cancellation Rate</span>
            <span className="stat-value">12%</span>
            <span className="stat-change" style={{color: 'var(--status-red)'}}>-1.1%</span>
          </div>
        </div>

        {/* Management Section */}
        <div className="management-section">
          
          <div className="section-header">
            <h3 className="section-title">Manage Spaces</h3>
            
            <div className="filter-bar">
              <select 
                className="custom-select"
                value={filterBuilding}
                onChange={(e) => setFilterBuilding(e.target.value)}
              >
                <option value="All">All Buildings</option>
                <option value="4570">Bld 4570</option>
                <option value="1070">Bld 1070</option>
              </select>

              <select 
                className="custom-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Occupied">Occupied</option>
              </select>

              <div className="search-wrapper">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="custom-search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="material-symbols-outlined search-icon">search</span>
              </div>
            </div>
          </div>

          {/* Table Grid */}
          <div className="table-scroll-container">
            <div className="data-grid">
              <div className="data-grid-header">
                <span>ID</span>
                <span>Space Name</span>
                <span>Location</span>
                <span>Capacity</span>
                <span>Status</span>
                <span style={{textAlign: 'right'}}>Actions</span>
              </div>

              {filteredRooms.map(room => (
                <div key={room.id} className="data-grid-row">
                  <span>#{room.id}</span>
                  <span style={{fontWeight: 600}}>{room.name}</span>
                  <span style={{color: '#9ca3af'}}>{room.location}</span>
                  <span style={{color: '#9ca3af'}}>{room.capacity} ppl</span>
                  
                  {/* Status Dropdown */}
                  <div className="status-select-wrapper">
                    <select 
                      value={room.status}
                      onChange={(e) => handleStatusChange(room.id, e.target.value)}
                      className={`status-select ${getStatusClass(room.status)}`}
                    >
                      <option value="Available">Available</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Occupied">Occupied</option>
                    </select>
                  </div>

                  {/* Actions */}
                  <div style={{display: 'flex', justifyContent: 'flex-end', gap: '8px'}}>
                    <button 
                      className="action-btn"
                      onClick={() => handleEdit(room.id)}
                      title="Edit Space"
                    >
                      <span className="material-symbols-outlined" style={{fontSize: '18px'}}>edit</span>
                    </button>
                  </div>
                </div>
              ))}

              {filteredRooms.length === 0 && (
                <div style={{padding: '32px', textAlign: 'center', color: '#6b7280'}}>
                  No spaces found matching your filters.
                </div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;