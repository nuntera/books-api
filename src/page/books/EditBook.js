import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import "./styles.css";

const EditBook = () => {
    const { id } = useParams();
    const [bookCover, setBookCover] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/v1/book/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    const book = data.data;
                    setTitle(book.title);
                    setDescription(book.description);
                    setYear(book.year);
                    setBookCover(book.book_cover);
                } else {
                    alert("Failed to fetch book details.");
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching book details:", error);
                setIsLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/api/v1/book/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({
                book_cover: bookCover,
                title: title,
                year: parseInt(year),
                description: description,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    navigate(`/books/${id}`);
                } else {
                    console.error("Failed to update book. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error updating book:", error);
            });
    };

    return (
        <Container className="edit-book-container">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="my-4 text-center">Edit Book</h2>

                    {isLoading ? (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            {/* Book Cover Input (URL) */}
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

                            {/* Title Input */}
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

                            {/* Year Input */}
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

                            {/* Description Input */}
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

                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" size="lg">
                                    Update Book
                                </Button>
                            </div>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default EditBook;
