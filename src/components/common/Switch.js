import React from 'react';
import './Switch.css';
const Switch = ({ isOn, handleToggle, onColor,switchID }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={switchID}
        type="checkbox"
      />
      <label
        style={{ background: isOn && onColor }}
        className="react-switch-label"
        htmlFor={switchID}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};
export default Switch;