import React from "react";
import "./style/styleSettings.css";

const Settings = () => {
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-content">
        <div className="setting-item">
          <h3>Notifications</h3>
          <p>Manage your notification preferences.</p>
          {/* Add notification settings options here */}
        </div>
        <div className="setting-item">
          <h3>Account</h3>
          <p>View and manage your account details.</p>
          {/* Add account settings options here */}
        </div>
        <div className="setting-item">
          <h3>Privacy</h3>
          <p>Control your privacy settings.</p>
          {/* Add privacy settings options here */}
        </div>
        <div className="setting-item">
          <h3>Security</h3>
          <p>Enhance your account security.</p>
          {/* Add security settings options here */}
        </div>
        <div className="setting-item">
          <h3>About</h3>
          <p>Learn more about our smart parking application.</p>
          {/* Add information about the application here */}
        </div>
      </div>
    </div>
  );
};

export default Settings;
