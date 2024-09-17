import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import Home from "../home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import BookList from "../books/BookList";
import BookDetails from "../books/BookDetails";
import AddBook from "../books/AddBook";
import EditBook from "../books/EditBook";
import Footer from "../../components/footer";
import ProtectedRoute from "../../components/ProtectedRoute";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <BrowserRouter>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Book Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                            </>
                        )}
                        <Nav.Link href="/books">Books List</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Container>
                <Row>
                    <Col>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
                            <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated}/>} />
                            <Route path="/books" element={<BookList />} />
                            <Route path="/books/:id" element={<BookDetails />} />

                            <Route path="/books/add" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
                            <Route path="/books/edit/:id" element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
                        </Routes>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </BrowserRouter>
    );
};

export default App;
