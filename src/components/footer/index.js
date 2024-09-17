import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './styles.css';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3">
            <Container>
                <Row className="justify-content-center text-center">
                    <Col md={8}>
                        <p>2024 Book Management App. Made with ❤️ by nuntera.</p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                        <ul className="social-links list-inline">
                            <li className="list-inline-item">
                                <a href="https://github.com/nuntera/books-api" target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
