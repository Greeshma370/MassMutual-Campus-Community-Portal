import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSelector from './components/Registrations/roleSelector.jsx'; // Adjust path if needed
import './WelcomePage.css'; // Create for styling

const WelcomePage = () => {
  // 1. State to keep track of the selected role
  const [selectedRole, setSelectedRole] = useState('student');
  
  // 2. Get the navigation function from React Router
  const navigate = useNavigate();

  // 3. Function to handle the register button click
  const handleRegister = () => {
    // Navigate to the dynamic register route with the selected role
    navigate(`/register/${selectedRole}`);
  };

  // 4. Function to handle the login button click (optional but good to have)
  const handleLogin = () => {
    navigate(`/login/${selectedRole}`);
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to the Placement Portal</h1>
      
      {/* Your RoleSelector component does the job of selecting the role */}
      <RoleSelector 
        initialRole={selectedRole}
        onRoleSelect={setSelectedRole} // Pass the state setter function
      />

      {/* Action buttons are here in the parent page */}
      <div className="action-buttons">
        <button onClick={handleLogin}>Login</button>
        <button className="primary" onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default WelcomePage;