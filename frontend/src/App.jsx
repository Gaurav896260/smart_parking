import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  text-align: center;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #a132de; /* Hot pink */
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: #e8d5d5;
  font-weight: bold;
  margin-bottom: 40px;
`;

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
`;

const Feature = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffcccc; /* Light pink */
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(14, 13, 13, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(14, 13, 13, 0.3);
  }
`;

const Icon = styled.i`
  font-size: 4rem;
  color: #f80844; /* Hot pink */
`;

const FeatureTitle = styled.h2`
  font-size: 2rem;
  margin-top: 10px;
  color: #0e0d0d;
  font-weight: bold;
`;

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Container>
      <Title>Welcome to Smart Parking</Title>
      <Description>
        Find the perfect parking spot for your vehicle with ease. Our smart
        parking solution helps you locate available parking spaces in real time,
        saving you time and hassle.
      </Description>
      <FeaturesContainer>
        <Link to="/signup">
          <Feature>
            <Icon className="ion-icon" name="car"></Icon>
            <FeatureTitle>User Registration</FeatureTitle>
            <p>Register as a user to find parking spots quickly.</p>
          </Feature>
        </Link>
        <Link to="/register">
          <Feature>
            <Icon className="ion-icon" name="navigate"></Icon>
            <FeatureTitle>Owner Registration</FeatureTitle>
            <p>Register your garage to offer parking spaces to users.</p>
          </Feature>
        </Link>
        {userInfo && (
          <Link to="/parkingticket">
            <Feature>
              <Icon className="ion-icon" name="receipt"></Icon>
              <FeatureTitle>Parking Ticket</FeatureTitle>
              <p>View your parking ticket details.</p>
            </Feature>
          </Link>
        )}
      </FeaturesContainer>
    </Container>
  );
};

export default App;
