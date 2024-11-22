import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const DetailsPage = () => {
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  if (!userData) {
    return (
      <div className="p-d-flex p-jc-center p-ai-center" style={{ height: '100vh' }}>
        <div className="p-card p-shadow-3 p-p-4">
          <h2>No Data Found</h2>
          <p>Please register to view your details.</p>
          <Button label="Go to Registration" className="p-mt-3" onClick={() => navigate('/')} />
        </div>
      </div>
    );
  }

  const { 
   fullName,
    gender, 
    dob, 
    age, 
    skills, 
    location, 
    selectedUniversity, 
    address,
    hobbies,
    favoriteColor, 
    modeOfStudy,
    rating,
    agreement 
  } = userData;

  return (
    <div className="p-d-flex p-jc-center p-mt-5 p-p-3">
      <div className="p-card p-shadow-3 p-p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="p-text-center">Registration Details</h2>
        <ul className="p-list" style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
          <li><strong>Full Name:</strong> {fullName || 'N/A'}</li>
          <li><strong>Mode of study:</strong> {modeOfStudy || 'N/A'}</li>
          <li><strong>Hobbies:</strong> {hobbies || 'N/A'}</li>
          <li><strong>Rating:</strong> {rating || 'N/A'}</li>
          <li><strong>Gender:</strong> {gender || 'N/A'}</li>
          <li><strong>FavoriteColor:</strong> {favoriteColor || 'N/A'}</li>
          <li><strong>Date of Birth:</strong> {dob ? new Date(dob).toLocaleDateString() : 'N/A'}</li>
          <li><strong>Age:</strong> {age || 'N/A'}</li>
          <li><strong>Skills:</strong> {skills && skills.length > 0 ? skills.join(', ') : 'No skills selected'}</li>
          <li>
            <strong>Location:</strong> {location 
              ? `${location.name || 'N/A'} (${location.code || 'N/A'})` 
              : 'Not provided'}
          </li>
          <li><strong>University:</strong> {selectedUniversity || 'Not selected'}</li>
          <li><strong>Address:</strong> {address || 'N/A'}</li>
          <li><strong>Agreement:</strong> {agreement ? 'Yes' : 'No'}</li>
        </ul>
        <div className="p-d-flex p-jc-between p-mt-4">
        
          <Button label="Create New Registration" className="p-button-success" onClick={() => navigate('/registration')} />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
