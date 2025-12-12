import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserManagementPage.css';

const UserManagementPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data from HTML
  const users = [
    { id: 1, name: "Leyla Eray", email: "leyla.eray@itu.edu.tr", studentId: "123456789", role: "Student", status: "Verified", date: "2025-10-15" },
    { id: 2, name: "Ahmet Yılmaz", email: "ahmet.yilmaz@itu.edu.tr", studentId: "123456789", role: "Space Manager", status: "Verified", date: "2025-10-22" },
    { id: 3, name: "Zeynep Kaya", email: "zeynep.kaya@itu.edu.tr", studentId: "123456789", role: "Student", status: "Suspended", date: "2025-11-03" },
    { id: 4, name: "Mustafa Can", email: "mustafa.can@itu.edu.tr", studentId: "123456789", role: "Student", status: "Pending", date: "2025-10-28" },
    { id: 5, name: "Admin User", email: "admin.user@itu.edu.tr", studentId: "123456789", role: "Administrator", status: "Verified", date: "2025-10-10" },
  ];

  // Helper for badges
  const getRoleClass = (role) => {
    if (role === 'Student') return 'student';
    if (role === 'Space Manager') return 'manager';
    return 'admin';
  };

  const getStatusClass = (status) => {
    return status.toLowerCase(); // verified, suspended, pending
  };

  // Mock Role Change Handler
  const handleRoleChange = (userId, newRole) => {
    // In a real app, this would be an API call
    console.log(`Updating user ${userId} to role: ${newRole}`);
    alert(`Role updated to ${newRole}`);
  };

  return (
    <div className="users-container dark">
      {/* Header */}
      <header className="users-header">
        <div className="brand-title" onClick={() => navigate('/')}>İTÜ Study Space Finder</div>
        
        <div className="header-nav">
          <div className="nav-links-desktop">
            <button className="nav-link" onClick={() => navigate('/admin')}>Dashboard</button>
            <button className="nav-link" onClick={() => navigate('/admin/audit-logs')}>Audit Logs</button>
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
        <button className="nav-link" style={{textAlign:'left'}}>Spaces</button>
        <button className="nav-link" style={{textAlign:'left'}}>Bookings</button>
        <button className="nav-link active" style={{textAlign:'left'}}>Users</button>
        <button className="nav-link" onClick={() => navigate('/admin/audit-logs')} style={{textAlign:'left'}}>Audit Logs</button>
      </div>

      {/* Main Content */}
      <main className="users-main">
        <div className="content-wrapper">
          
          {/* Page Heading */}
          <div className="page-heading">
            <h1 className="page-title">User Management</h1>
            {/* Add User button removed */}
          </div>

          {/* Filter Panel */}
          <div className="filter-panel">
            <div className="filter-row">
              <div className="search-wrapper">
                <span className="material-symbols-outlined search-icon">search</span>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search by name, email, or ID..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button className="filter-dropdown">
                Role: All
                <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              
              <button className="filter-dropdown">
                Status: All
                <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              
              <button className="clear-btn">Clear Filters</button>
            </div>
          </div>

          {/* Users Table */}
          <div className="table-container">
            <div className="table-scroll-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th style={{width: '48px', textAlign: 'center'}}>
                      <input type="checkbox" className="table-checkbox" />
                    </th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Student/Staff ID</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Date Registered</th>
                    <th style={{textAlign: 'right'}}>Change Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td style={{textAlign: 'center'}}>
                        <input type="checkbox" className="table-checkbox" />
                      </td>
                      <td>{user.name}</td>
                      <td style={{color: '#9ca3af'}}>{user.email}</td>
                      <td style={{color: '#9ca3af'}}>{user.studentId}</td>
                      <td>
                        <span className={`role-badge ${getRoleClass(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusClass(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td style={{color: '#9ca3af'}}>{user.date}</td>
                      <td style={{textAlign: 'right'}}>
                        {/* New Action Select */}
                        <select 
                          className="action-select" 
                          defaultValue="" 
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        >
                          <option value="" disabled>Assign Role</option>
                          <option value="Student">Student</option>
                          <option value="Space Manager">Space Manager</option>
                          <option value="Administrator">Administrator</option>
                        </select>
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
              Showing <span style={{fontWeight: 700, color: 'var(--text-light)'}}>1-5</span> of <span style={{fontWeight: 700, color: 'var(--text-light)'}}>25</span>
            </span>
            
            <div className="pagination-controls">
              <button className="page-nav-btn" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              
              <div style={{display:'flex', gap:'4px'}}>
                <button className="page-nav-btn active">1</button>
                <button className="page-nav-btn">2</button>
                <button className="page-nav-btn">3</button>
                <span style={{color: '#6b7280', padding: '0 4px', display:'flex', alignItems:'center'}}>...</span>
                <button className="page-nav-btn">5</button>
              </div>
              
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

export default UserManagementPage;