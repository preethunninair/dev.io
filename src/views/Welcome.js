import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

function Welcome(props) {
  return (
    <Container fluid>
      <Row>
        <Col className="center" style={{ height: "100vh" }}>
          <h1 class="font-weight-lighter">
            dev.<span style={{ color: "red" }}>io</span>
          </h1>
          <div
            className="border-right position-absolute"
            style={{ height: "70%", right: 10 }}
          />
        </Col>
        <Col className="d-flex align-items-center">
          <ul class="welcome-menu">
            <li class="grow">
              <Link
                to="/createproject"
                className="text-decoration-none text-secondary"
              >
                Create Project
              </Link>
            </li>
            <li class="grow">
              <Link
                to="/editproject"
                className="text-decoration-none text-secondary"
              >
                Edit Project{" "}
              </Link>
            </li>
            <li class="grow">
              <Link to="/wthit" className="text-decoration-none text-secondary">
                Documentation
              </Link>
            </li>
            <li class="grow">
              <Link
                to="/doctor"
                className="text-decoration-none text-secondary"
              >
                {" "}
                Health
              </Link>
            </li>
            <li class="grow">
              <Link
                to="/doctor"
                className="text-decoration-none text-secondary"
              >
                {" "}
                Mockito
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Welcome;
