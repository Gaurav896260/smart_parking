import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRegisterMutation } from "../../redux/api/owner";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";

// Styled components for styling
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333333;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  margin-bottom: 20px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Text = styled.p`
  font-size: 14px;
  color: #333333;
`;

const LinkText = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Registration = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState(""); // Add state for address
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [register] = useRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      setIsLoading(true);
      try {
        const res = await register({
          fullName,
          email,
          password,
          address, // Include address in the registration request
        }).unwrap();
        setIsLoading(false);
        navigate("/dashboard");
        toast.success("Owner registered successfully.");
      } catch (err) {
        setIsLoading(false);
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Heading>Owner Registration</Heading>
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            id="fullName"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label> {/* Add Address Field */}
          <Input
            type="text"
            id="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Registering..." : "Register"}
        </Button>
        {isLoading && <Loader />}
        <Text>
          Already have an account? <LinkText to="/login">Login</LinkText>
        </Text>
      </Form>
    </Container>
  );
};

export default Registration;
