import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./styles.css";

const AddBook = () => {
    const [bookCover, setBookCover] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        fetch('/api/v1/book/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({
                book_cover: bookCover,
                year: parseInt(year),
                title: title,
                description: description,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    navigate("/books");
                } else {
                    alert("Failed to add book. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error adding book:", error);
            });
    };

    return (
        <Container className="add-book-container">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="my-4">Add New Book</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter book title" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3}
                                placeholder="Enter book description" 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Enter publication year" 
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBookCover">
                            <Form.Label>Book Cover URL</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter cover image URL" 
                                value={bookCover}
                                onChange={(e) => setBookCover(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Add Book
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddBook;
