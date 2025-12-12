import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuditLogsPage.css';

const AuditLogsPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const logs = [
    { id: 1, time: "2025-10-27 14:30:15", user: "admin@itu.edu.tr", action: "BOOKING_CREATED", target: "Space: G-101", result: "Success" },
    { id: 2, time: "2025-10-27 13:45:02", user: "staff@itu.edu.tr", action: "USER_UPDATED", target: "User: 12345", result: "Success" },
    { id: 3, time: "2025-10-27 12:01:55", user: "student@itu.edu.tr", action: "LOGIN_ATTEMPT", target: "N/A", result: "Failure" },
    { id: 4, time: "2025-10-27 11:55:23", user: "admin@itu.edu.tr", action: "SPACE_DELETED", target: "Space: M-203", result: "Success" },
    { id: 5, time: "2025-10-26 09:12:10", user: "system", action: "BACKUP_COMPLETED", target: "Database", result: "Success" },
  ];

  return (
    <div className="audit-container dark">
      {/* Header */}
      <header className="audit-header">
        <div className="brand-title" onClick={() => navigate('/')}>İTÜ Study Space Finder</div>
        
        <div className="header-nav">
          <div className="nav-links-desktop">

            <button className="nav-link" onClick={() => navigate('/admin')}>Dashboard</button>
            <button className="nav-link" onClick={() => navigate('/admin/users')}>User Management</button>
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
        <button onClick={() => navigate('/admin')} className="nav-link" style={{textAlign:'left'}}>Dashboard</button>
        <button className="nav-link" style={{textAlign:'left'}}>Spaces</button>
        <button className="nav-link" style={{textAlign:'left'}}>Bookings</button>
        <button className="nav-link" style={{textAlign:'left'}}>Users</button>
        <button className="nav-link active" style={{textAlign:'left'}}>Audit Logs</button>
      </div>

      {/* Main Content */}
      <main className="audit-main">
        <div className="content-wrapper">
          
          {/* Page Heading */}
          <div className="page-heading">
            <div>
              <h1 className="page-title">Audit Logs</h1>
              <p className="page-subtitle">Monitor all system activities and user actions.</p>
            </div>
            <button className="export-btn">
              <span className="material-symbols-outlined">download</span>
              Export to CSV
            </button>
          </div>

          {/* Filter Panel */}
          <div className="filter-panel">
            <div className="filter-row">
              <div className="search-wrapper">
                <span className="material-symbols-outlined search-icon">search</span>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search by user email or ID..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button className="filter-dropdown">
                Action Type: All
                <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              
              <button className="filter-dropdown">
                Target Entity: All
                <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              
              <button className="filter-dropdown">
                Date Range
                <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              
              <button className="clear-btn">Clear Filters</button>
            </div>
          </div>

          {/* Logs Table */}
          <div className="table-container">
            <div className="table-scroll-wrapper">
              <table className="logs-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Target</th>
                    <th>Result</th>
                    <th style={{textAlign: 'right'}}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td style={{whiteSpace: 'nowrap'}}>{log.time}</td>
                      <td style={{color: '#9ca3af'}}>{log.user}</td>
                      <td>{log.action}</td>
                      <td style={{color: '#9ca3af'}}>{log.target}</td>
                      <td>
                        <div className="status-badge">
                          {/* Circle logic based on Success/Failure */}
                          <div className={`status-dot ${log.result === 'Success' ? 'status-success' : 'status-failure'}`}></div>
                          {log.result}
                        </div>
                      </td>
                      <td style={{textAlign: 'right'}}>
                        <button className="view-btn">
                          <span className="material-symbols-outlined" style={{fontSize: '18px'}}>visibility</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="pagination-bar">
            <span className="page-info">
              Showing <span style={{fontWeight: 700, color: 'var(--text-light)'}}>1-5</span> of <span style={{fontWeight: 700, color: 'var(--text-light)'}}>100</span>
            </span>
            
            <div className="pagination-controls">
              <button className="page-nav-btn" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              
              <button className="page-nav-btn active">1</button>
              <button className="page-nav-btn">2</button>
              <button className="page-nav-btn">3</button>
              <span style={{color: '#6b7280', padding: '0 4px'}}>...</span>
              <button className="page-nav-btn">100</button>
              
              <button className="page-nav-btn">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AuditLogsPage;