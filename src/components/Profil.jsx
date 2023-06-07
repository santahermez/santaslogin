import React from 'react';
import { Link } from 'react-router-dom';
import "./profil.css";


const ProfilePage = () => {
  return (
    <div className='container'>
      <h1>Profile Page</h1>
      <Link to="/AccountSettings">
        <button>Account Settings</button>
      </Link>
    </div>
  );
};

export default ProfilePage;
