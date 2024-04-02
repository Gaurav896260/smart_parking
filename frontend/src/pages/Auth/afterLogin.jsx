import React from "react";

const AfterLogin = () => {
  return (
    <div className="after-login-container">
      <div className="content">
        <h1>Welcome to Smart Parking</h1>
        <p className="content">
          Find the perfect parking spot for your vehicle with ease. Our smart
          parking solution helps you locate available parking spaces in real
          time, saving you time and hassle.
        </p>
        <div className="features">
          <div className="feature">
            <ion-icon name="car"></ion-icon>
            <h2>Convenient Parking</h2>
            <p>Discover nearby parking spots quickly and easily.</p>
          </div>
          <div className="feature">
            <ion-icon name="navigate"></ion-icon>
            <h2>Real-Time Navigation</h2>
            <p>Get directions to your selected parking location.</p>
          </div>
          <div className="feature">
            <ion-icon name="time"></ion-icon>
            <h2>Time-Saving</h2>
            <p>Avoid wasting time searching for parking spaces.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterLogin;

// CSS Styles
const styles = `
  .after-login-container {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .content {
    text-align: center;
  }

  .content h1 {
    color: #333;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .content .content {
    color: #555;
    font-size: 1.2rem;
    line-height: 1.5;
    margin-bottom: 30px;
  }

  .features {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .feature {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    flex: 1;
    text-align: center;
  }

  .feature ion-icon {
    font-size: 3rem;
    margin-bottom: 10px;
  }

  .feature h2 {
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .feature p {
    color: #555;
    font-size: 1.1rem;
    line-height: 1.4;
  }
`;

// Create a style tag and append it to the head of the document
const styleTag = document.createElement("style");
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);
