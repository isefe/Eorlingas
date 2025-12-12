import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyEmailPage.css';

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Focus previous input on backspace if current is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length === 6) {
      // API call to verify would go here
      alert(`Verifying code: ${code}`);
      navigate('/login'); // Redirect on success
    } else {
      alert("Please enter the full 6-digit code.");
    }
  };

  return (
    <div className="verify-container dark">
      <main className="verify-main">
        <div className="verify-card">
          
          <h1 className="verify-title">Verify Your İTÜ Email</h1>
          
          <p className="verify-text">
            An email with a verification code has been sent to your İTÜ email address. Please enter the code below.
          </p>

          <div className="otp-container">
            <fieldset className="otp-fieldset">
              {otp.map((data, index) => (
                <React.Fragment key={index}>
                  <input
                    className="otp-input"
                    type="text"
                    name="otp"
                    maxLength="1"
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    ref={el => inputRefs.current[index] = el}
                    inputMode="numeric"
                  />
                  {index === 2 && <span className="separator">-</span>}
                </React.Fragment>
              ))}
            </fieldset>
          </div>

          <div className="verify-btn-container">
            <button className="verify-btn" onClick={handleVerify}>
              Verify
            </button>
          </div>

          <div className="resend-container">
            <p className="resend-text">
              Didn't receive the email? <span className="resend-link">Resend</span>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default VerifyEmailPage;