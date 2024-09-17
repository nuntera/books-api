import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Button, Card, Spinner, Row } from "react-bootstrap";
import "./styles.css";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/v1/book/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    setBook(data.data);
                } else {
                    console.error("Failed to fetch book details.");
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching book details:", error);
                setIsLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;

        fetch(`/api/v1/book/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": token,
            }
        })
            .then((response) => {
                if (response.ok) {
                    alert("Book deleted successfully.");
                    navigate("/books");
                } else {
                    alert("Failed to delete the book.");
                }
            })
            .catch((error) => {
                console.error("Error deleting book:", error);
            });
    };

    return (
        <Container className="book-details-container">
            {isLoading ? (
                <Row className="justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            ) : (
                book ? (
                    <Card className="book-card">
                        <Card.Img
                            variant="top"
                            src={book.book_cover}
                            alt={book.title}
                            className="book-cover"
                        />
                        <Card.Body>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Text>
                                <strong>Year:</strong> {book.year}
                                <br />
                                <strong>Description:</strong> {book.description}
                                <br />
                                <strong>Added by:</strong> {book.user.name}
                            </Card.Text>

                            {/* Conditionally show Edit and Delete buttons only if authenticated */}
                            {token && (
                                <div className="mt-4 d-flex justify-content-start">
                                    <Button as={Link} to={`/books/edit/${book.id}`} variant="warning" className="mr-2">
                                        Edit Book
                                    </Button>
                                    <Button variant="danger" onClick={handleDelete}>
                                        Delete Book
                                    </Button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                ) : (
                    <Row className="justify-content-center">
                        <p>Book not found or failed to load the details.</p>
                    </Row>
                )
            )}
        </Container>
    );
};

export default BookDetails;
