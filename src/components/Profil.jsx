import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Profil.css";

const ProfilePage = () => {
  const [image, setImage] = useState(null);
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    setImage(URL.createObjectURL(uploadedImage));
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  if (token) {
    return (
      <div className='container'>
        <div className="logout">
          <button onClick={logout}>Logga ut</button>
        </div>
        <h1>Profil</h1>
        <h2>Välkommen</h2>
        {/* Lägg till input-taggen för att välja och ladda upp en bild */}
        <label htmlFor="upload" className="custom-file-upload">
          <input id="upload" type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
        {/* Visa den uppladdade bilden */}
        {image && <img src={image} alt="Uploaded Profile" />}
        <Link to='/AccountSettings'>
          <button>Kontoinställningar</button>
        </Link>
      </div>
    );
  } else {
    window.location.href = '/login';
  }
};

export default ProfilePage;
