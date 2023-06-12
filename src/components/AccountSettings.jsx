import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./account-settings.css";

const AccountSettings = () => {
  const [email, setEmail] = useState('example@example.com');
  const [password, setPassword] = useState('');
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isChangesSaved, setIsChangesSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken')

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUpdateUser = () => {
    setIsEmailVisible(true);
    setIsPasswordVisible(true);
  };

  const handleDeleteUser = () => {
    setIsEmailVisible(true);
    setIsPasswordVisible(true);
  };

  const handleCancel = () => {
    setIsEmailVisible(false);
    setIsPasswordVisible(false);
    setIsChangesSaved(false);
    navigate('/accountsettings');
  };

  const handleSaveChanges = () => {
    setIsChangesSaved(true);
    setIsEmailVisible(false);
    setIsPasswordVisible(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/profil');
  };

  if (token) {
    return (
      <div className='account-settings'>
        <h2>Account Settings</h2>
        {isChangesSaved ? (
          <div>
            <p>Changes Saved!</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        ) : (
          <>
            {isEmailVisible && (
              <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} />
              </div>
            )}
            {isPasswordVisible && (
              <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} />
              </div>
            )}
            {!isEmailVisible && !isPasswordVisible && (
              <div className="button-group">
                <button onClick={handleUpdateUser}>Update User</button>
                <button onClick={handleDeleteUser}>Delete User</button>
                <button><Link to="/profil">Go to Profile</Link></button>
              </div>
            )}
            {isEmailVisible && isPasswordVisible && (
              <div className="button-group">
                <button onClick={handleSaveChanges}>Save Changes</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            )}
          </>
        )}
      </div>
    );
  } else {
    window.location.href = '/login';
  }
};

export default AccountSettings;
