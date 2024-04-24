import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <Container>
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <Col xs={12} md={9} className="text-center">
          <h1 className="display-1">404 Page Not Found</h1>
          <p className="mb-1">
            The requested page does not exist. Click the link below to go back
            to the dashboard.
          </p>
          <Link to="/dashboard" className="btn btn-dark btn-sm mt-3 px-5">
            Go back to Dashboard
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
