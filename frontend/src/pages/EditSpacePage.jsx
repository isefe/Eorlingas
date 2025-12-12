import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditSpacePage.css';

const EditSpacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [newFeatureInput, setNewFeatureInput] = useState("");
  const [availableFeatures, setAvailableFeatures] = useState([
    "WiFi", "Power Outlets", "Whiteboard", "Projector", "TV", "Air Conditioning"
  ]);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    status: 'Available',
    noiseLevel: 'Moderate',
    description: '',
    features: [], 
    schedule: {
      weekdays: { start: "08:00", end: "22:00", closed: false },
      weekends: { start: "09:00", end: "20:00", closed: false }
    }
  });

  useEffect(() => {
    setFormData({
      name: `Lecture Hall A`, 
      location: '4570',
      capacity: 28,
      status: 'Available',
      noiseLevel: 'Quiet',
      description: 'Standard lecture hall with projector and whiteboard.',
      features: ["WiFi", "Whiteboard"],
      schedule: {
        weekdays: { start: "08:00", end: "22:00", closed: false },
        weekends: { start: "09:00", end: "20:00", closed: true } 
      }
    });
  }, [id]);

  const handleFeatureToggle = (feature) => {
    setFormData(prev => {
      const newFeatures = prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature) 
        : [...prev.features, feature]; 
      return { ...prev, features: newFeatures };
    });
  };

  const handleAddFeature = (e) => {
    e.preventDefault(); 
    if (newFeatureInput.trim() && !availableFeatures.includes(newFeatureInput)) {
      setAvailableFeatures([...availableFeatures, newFeatureInput]); 
      handleFeatureToggle(newFeatureInput); 
      setNewFeatureInput("");
    }
  };

  const handleScheduleChange = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [type]: {
          ...prev.schedule[type],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    alert("Changes saved successfully!");
    navigate('/admin');
  };

  return (
    <div className="edit-container dark">
      
      <header className="edit-header">
        <div className="brand-title" onClick={() => navigate('/')}>İTÜ Study Space Finder</div>
        
        <div className="header-nav">
          <div className="nav-links-desktop">
            <button className="nav-link" onClick={() => navigate('/space-manager/')}>Dashboard</button>
            <button className="nav-link" onClick={() => navigate('/space-manager/create-space')}>Create Space</button>
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

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <button onClick={() => navigate('/admin')} className="nav-link" style={{textAlign:'left'}}>Dashboard</button>
        <button className="nav-link" style={{textAlign:'left'}}>Bookings</button>
        <button onClick={() => navigate('/')} className="nav-link" style={{textAlign:'left'}}>Home</button>
      </div>

      <main className="edit-main">
        <div className="edit-card">
          <div className="card-header-row">
            <h1 className="card-title">Edit Space #{id}</h1>
            <button className="btn-cancel" onClick={() => navigate('/admin')} style={{fontSize: '0.8rem', padding: '6px 12px'}}>
              Cancel
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="edit-form">
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Space Name</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location / Building</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="form-row" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>
              <div className="form-group">
                <label className="form-label">Capacity</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select 
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Available">Available</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Occupied">Occupied</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Noise Level</label>
                <select 
                  className="form-select"
                  value={formData.noiseLevel}
                  onChange={(e) => setFormData({...formData, noiseLevel: e.target.value})}
                >
                  <option value="Silent">Silent</option>
                  <option value="Quiet">Quiet</option>
                  <option value="Moderate">Moderate</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Features</label>
              <div className="features-grid">
                {availableFeatures.map(feature => (
                  <button
                    type="button"
                    key={feature}
                    className={`feature-chip ${formData.features.includes(feature) ? 'active' : ''}`}
                    onClick={() => handleFeatureToggle(feature)}
                  >
                    {feature}
                  </button>
                ))}
              </div>
              
              <div className="add-feature-row">
                <input 
                  type="text"
                  className="form-input"
                  placeholder="Add custom feature..."
                  value={newFeatureInput}
                  onChange={(e) => setNewFeatureInput(e.target.value)}
                  style={{maxWidth: '200px', fontSize: '0.85rem'}}
                />
                <button type="button" className="add-feature-btn" onClick={handleAddFeature}>
                  + Add
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Weekly Schedule</label>
              <div className="schedule-box">
                
                <div className="schedule-group">
                  <span className="schedule-group-title">Weekdays (Monday - Friday)</span>
                  <div className="schedule-controls">
                    <div className="time-wrapper">
                      <input 
                        type="time" 
                        className="time-input" 
                        value={formData.schedule.weekdays.start}
                        disabled={formData.schedule.weekdays.closed}
                        onChange={(e) => handleScheduleChange('weekdays', 'start', e.target.value)}
                      />
                      <span>to</span>
                      <input 
                        type="time" 
                        className="time-input" 
                        value={formData.schedule.weekdays.end}
                        disabled={formData.schedule.weekdays.closed}
                        onChange={(e) => handleScheduleChange('weekdays', 'end', e.target.value)}
                      />
                    </div>
                    <label className="checkbox-wrapper">
                      <input 
                        type="checkbox" 
                        checked={formData.schedule.weekdays.closed}
                        onChange={(e) => handleScheduleChange('weekdays', 'closed', e.target.checked)}
                      />
                      Closed on weekdays
                    </label>
                  </div>
                </div>

                <div className="schedule-group">
                  <span className="schedule-group-title">Weekends (Saturday - Sunday)</span>
                  <div className="schedule-controls">
                    <div className="time-wrapper">
                      <input 
                        type="time" 
                        className="time-input" 
                        value={formData.schedule.weekends.start}
                        disabled={formData.schedule.weekends.closed}
                        onChange={(e) => handleScheduleChange('weekends', 'start', e.target.value)}
                      />
                      <span>to</span>
                      <input 
                        type="time" 
                        className="time-input" 
                        value={formData.schedule.weekends.end}
                        disabled={formData.schedule.weekends.closed}
                        onChange={(e) => handleScheduleChange('weekends', 'end', e.target.value)}
                      />
                    </div>
                    <label className="checkbox-wrapper">
                      <input 
                        type="checkbox" 
                        checked={formData.schedule.weekends.closed}
                        onChange={(e) => handleScheduleChange('weekends', 'closed', e.target.checked)}
                      />
                      Closed on weekends
                    </label>
                  </div>
                </div>

              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea 
                className="form-textarea"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-cancel"
                onClick={() => navigate('/admin')}
              >
                Discard Changes
              </button>
              <button type="submit" className="btn-save">
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
};

export default EditSpacePage;