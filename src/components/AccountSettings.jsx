import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./account-settings.css";

const AccountSettings = () => {
  const [email, setEmail] = useState('example@example.com');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleDeleteUser = () => {
    // Perform delete user logic here
    console.log('User deleted');
  };

  return (
    <div className='account-settings'>
      <h2>Account Settings</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
      </form>
      <button onClick={handleDeleteUser}>Delete User</button>
      <button><Link to="/profil">Go to Profile</Link></button>
    </div>
  );
};

export default AccountSettings;
