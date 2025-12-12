import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateSpacePage.css';

const CreateSpacePage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [currentStep, setCurrentStep] = useState(1);

  const [availableFeatures, setAvailableFeatures] = useState([
    "WiFi", "Power Outlets", "Whiteboard", "Projector", "TV", "Air Conditioning"
  ]);
  const [newFeatureInput, setNewFeatureInput] = useState("");

  const [formData, setFormData] = useState({
    campus: '',
    building: '',
    spaceName: '',
    capacity: '',
    features: [],
    weekdayStart: '08:00',
    weekdayEnd: '22:00',
    weekendStart: '10:00',
    weekendEnd: '20:00'
  });

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else {
      console.log("Submitting Space:", formData);
      alert("Space Created Successfully!");
      navigate('/admin');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-fields">
            <div className="input-group">
              <label className="input-label">Campus</label>
              <select name="campus" className="form-select" value={formData.campus} onChange={handleChange}>
                <option value="">Select a campus</option>
                <option value="Ayazağa">Ayazağa Campus</option>
                <option value="Gümüşsuyu">Gümüşsuyu Campus</option>
                <option value="Maçka">Maçka Campus</option>
                <option value="Taşkışla">Taşkışla Campus</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Building</label>
              <select name="building" className="form-select" value={formData.building} onChange={handleChange}>
                <option value="">Select a building</option>
                <option value="Library">Mustafa İnan Library</option>
                <option value="MED">MED Building</option>
                <option value="EEF">Electrical Engineering Faculty</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-fields">
            <div className="input-group">
              <label className="input-label">Space Name</label>
              <input 
                type="text" 
                name="spaceName" 
                className="form-input" 
                placeholder="e.g. Group Study Room 1" 
                value={formData.spaceName}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Capacity</label>
              <input 
                type="number" 
                name="capacity" 
                className="form-input" 
                placeholder="e.g. 10" 
                value={formData.capacity}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-fields">
            <div className="input-group">
              <label className="input-label">Select Features</label>
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
            </div>
            
            <div className="input-group">
              <label className="input-label">Add Custom Feature</label>
              <div className="add-feature-row">
                <input 
                  type="text"
                  className="form-input"
                  placeholder="e.g. Soundproof"
                  value={newFeatureInput}
                  onChange={(e) => setNewFeatureInput(e.target.value)}
                />
                <button type="button" className="add-feature-btn" onClick={handleAddFeature}>
                  + Add
                </button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-fields">
            <div className="input-group">
              <label className="input-label" style={{color:'var(--primary-color)', fontWeight:700}}>Weekdays (Mon-Fri)</label>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
                <div>
                  <label className="input-label" style={{fontSize:'0.75rem', marginBottom:'4px', display:'block'}}>Start</label>
                  <input type="time" name="weekdayStart" className="form-input" value={formData.weekdayStart} onChange={handleChange} />
                </div>
                <div>
                  <label className="input-label" style={{fontSize:'0.75rem', marginBottom:'4px', display:'block'}}>End</label>
                  <input type="time" name="weekdayEnd" className="form-input" value={formData.weekdayEnd} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" style={{color:'var(--primary-color)', fontWeight:700}}>Weekends (Sat-Sun)</label>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
                <div>
                  <label className="input-label" style={{fontSize:'0.75rem', marginBottom:'4px', display:'block'}}>Start</label>
                  <input type="time" name="weekendStart" className="form-input" value={formData.weekendStart} onChange={handleChange} />
                </div>
                <div>
                  <label className="input-label" style={{fontSize:'0.75rem', marginBottom:'4px', display:'block'}}>End</label>
                  <input type="time" name="weekendEnd" className="form-input" value={formData.weekendEnd} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="create-container dark">
      <header className="create-header">
        <div className="brand-title" onClick={() => navigate('/')}>İTÜ Study Space Finder</div>
        
        <div className="header-nav">
          <div className="nav-links-desktop">
            <button className="nav-link" onClick={() => navigate('/space-manager/')}>Dashboard</button>
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

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <button onClick={() => navigate('/admin')} className="nav-link" style={{textAlign:'left'}}>Dashboard</button>
        <button className="nav-link" style={{textAlign:'left'}}>Spaces</button>
      </div>

      <main className="create-main">
        <div className="content-wrapper">
          
          <h1 className="page-title">Create a New Study Space</h1>

          <div className="create-grid">
            
            <div className="stepper-nav">
              {[
                { id: 1, title: 'Location', desc: 'Campus and building.' },
                { id: 2, title: 'Basic Information', desc: 'Details about the space.' },
                { id: 3, title: 'Features', desc: 'Amenities and accessibility.' },
                { id: 4, title: 'Operating Hours', desc: 'Weekday and weekend times.' }
              ].map((step) => (
                <button 
                  key={step.id} 
                  className={`step-item ${currentStep === step.id ? 'active' : ''}`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  <div className="step-icon">{step.id}</div>
                  <div>
                    <div className="step-title">{step.title}</div>
                    <div className="step-desc">{step.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="form-card">
              <div className="form-body">
                <div className="step-header">
                  <h3>Step {currentStep}: {
                    currentStep === 1 ? 'Location' : 
                    currentStep === 2 ? 'Basic Information' : 
                    currentStep === 3 ? 'Features' : 'Operating Hours'
                  }</h3>
                </div>
                
                {renderStepContent()}
              </div>

              <div className="form-footer">
                {currentStep > 1 && (
                  <button className="btn-prev" onClick={handlePrev}>
                    Back
                  </button>
                )}
                
                <button className="btn-next" onClick={handleNext}>
                  <span>{currentStep === 4 ? 'Create Space' : 'Next Step'}</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateSpacePage;