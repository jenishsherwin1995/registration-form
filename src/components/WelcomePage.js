import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const viewDetails = () => {
    navigate('/details');
  };

  const backToForm = () => {
    navigate('/');
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center" style={{ height: '100vh' }}>
      <div className="p-card p-shadow-3 p-p-4">
        <h2>Form Submitted Successfully!</h2>
        <div className="p-d-flex p-ai-center p-mt-3">
          <Button label="View Details" className="p-mr-2" onClick={viewDetails} />
          <Button label="Back to Form" className="p-button-secondary" onClick={backToForm} />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
