import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useSignupMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import styled from "styled-components";
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

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useSignupMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await register({
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered.");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Heading>Signup</Heading>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Enter Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Registering..." : "Register"}
        </Button>
        {isLoading && <Loader />}
        <Text>
          Already have an account?{" "}
          <LinkText to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </LinkText>
        </Text>
      </Form>
    </Container>
  );
};

export default Signup;
