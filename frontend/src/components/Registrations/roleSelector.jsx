import React, { useState } from 'react';
import './roleSelector.css';

/**
 * A component allowing the user to select their role (Student, Faculty, or Management)
 * using radio buttons.
 * * @param {object} props - Component properties.
 * @param {function} props.onRoleSelect - Function to call when a role is selected.
 * @param {string} props.initialRole - The default selected role ('student' | 'faculty' | 'management').
 */
const RoleSelector = ({ onRoleSelect, initialRole = 'student' }) => {
  const [selectedRole, setSelectedRole] = useState(initialRole);

  const roles = [
    { value: 'student', label: 'Student' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'management', label: 'Management' },
  ];

  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    setSelectedRole(newRole);
    // Optionally call the external function immediately
    if (onRoleSelect) {
      onRoleSelect(newRole);
    }
  };

  return (
    <div className="role-selector-card">
      <h3 className="role-selector-title">Select Your Role</h3>
      <div className="role-options-group">
        {roles.map((role) => (
          <label key={role.value} className="role-radio-label">
            <input
              type="radio"
              name="userRole"
              value={role.value}
              checked={selectedRole === role.value}
              onChange={handleRoleChange}
              className="role-radio-input"
            />
            <span className="radio-custom"></span>
            {role.label}
          </label>
        ))}
      </div>
      <p className="selected-role-display">
        Selected: <strong>{selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</strong>
      </p>
    </div>
  );
};

export default RoleSelector;
