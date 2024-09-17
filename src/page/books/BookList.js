import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import './styles.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    setIsLoading(true);
    fetch('/api/v1/book?sort_by=year&order_by=desc')
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setBooks(data.data);
        } else {
          console.error("Error fetching books.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setIsLoading(false);
      });
  };

  const truncateDescription = (description, maxLength = 100) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    }
    return description;
  };

  return (
    <Container className="book-list-container">
      <Row className="justify-content-between align-items-center my-4">
        <Col>
          <h2>Public Book List</h2>
        </Col>
        <Col className="text-right">
          {/* Show Add Book button only if authenticated */}
          {token && (
            <Button variant="primary" as={Link} to="/books/add">
              Add New Book
            </Button>
          )}
        </Col>
      </Row>

      {isLoading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      ) : (
        <Row>
          {books.map((book) => (
            <Col md={6} lg={4} key={book.id} className="mb-4">
              <Card className="book-card h-100">
                <Card.Img
                  variant="top"
                  src={book.book_cover}
                  alt={book.title}
                  className="book-cover"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>
                    <strong>Year:</strong> {book.year}
                    <br />
                    <strong>Description:</strong> {truncateDescription(book.description)}
                  </Card.Text>
                  <Button
                    as={Link}
                    to={`/books/${book.id}`}
                    variant="info"
                    className="mt-auto"
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default BookList;
