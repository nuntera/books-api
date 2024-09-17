import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import RecentActivity from "./RecentActivity";
import './styles.css';

const Home = () => {
    return (
        <Container className="home-container">
            <Row className="justify-content-center text-center">
                <Col md={8}>
                    <h1>Welcome to Book Management</h1>
                    <p className="lead">
                        Manage your book collection. Add, edit, delete, and keep track of your recent activities.
                    </p>
                </Col>
            </Row>

            <Row className="justify-content-center mt-4">
                <Col md={4} className="text-center">
                    <Link to="/login">
                        <Button variant="primary" className="home-btn">Login</Button>
                    </Link>
                </Col>
                <Col md={4} className="text-center">
                    <Link to="/register">
                        <Button variant="secondary" className="home-btn">Register</Button>
                    </Link>
                </Col>
            </Row>

            <Row className="recent-activity text-center mt-4">
                <Col>
                    <h2>Recent Activity</h2>
                    <RecentActivity />
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
