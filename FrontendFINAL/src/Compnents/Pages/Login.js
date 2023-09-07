import React, { useState } from 'react';
import Navbar from "../PageNavigation";
import { Link, useNavigate } from 'react-router-dom';
import RegistrationForm from './FillUserDetail';
import '../../Style/LoginPage.css'; 

function LoginPage({ setUserData }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8085/api/user/${email}/${password}`);
      const result = await response.json();
      setUserData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    // Navigate to the registration form
    navigate('/registrationform');
  }

  return (
    <div>
      <Navbar />
      <div className="login-page-container">

        <div className="login-form">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Login</button> 
        </div>

        <div className="buttons">
          <button className="register-button">Become a member</button>  
        </div>
      </div>


    </div>
  );
}

export default LoginPage;
