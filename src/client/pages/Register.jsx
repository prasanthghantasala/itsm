import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import axios from "../utils/axios";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(e.target.formFirstName.value);

    const firstName = e.target.formFirstName.value;
    const lastName = e.target.formLastName.value;
    const email = e.target.formEmail.value;
    const password = e.target.formPassword.value;
    const role = e.target.formRole.value;

    try {
      await axios.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        role,
      });

      toast.success("Registration successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

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
          <Card.Title>Register</Card.Title>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              {/* select: ADMIN, USER */}
              {/* <select
                className="form-select"
                aria-label="Default select example"
                defaultValue="USER"
              >
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
              </select> */}
              <Form.Select aria-label="Default select example">
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" className="btn btn-dark mt-3 px-5">
              Register
            </Button>
          </Form>

          <p className="text-center">
            Already have an account? <a href="/">Login</a>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
