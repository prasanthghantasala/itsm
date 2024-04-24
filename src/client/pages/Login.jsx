import React, { useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import axios from "../utils/axios";

const Login = () => {
  const navigate = useNavigate();
  // /auth/login

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.formEmail.value;
    const password = e.target.formPassword.value;

    try {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        maxWidth: "100vw",
        backgroundImage: "url(/background.avif)",
      }}
    >
      <Card className="p-3" style={{ width: "40vw" }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mt-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button type="submit" className="btn btn-dark mt-3 px-5">
              Login
            </Button>
            <p className="text-center">
              Don't have an account? <a href="/register">Register</a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
