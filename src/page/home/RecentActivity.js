import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import './styles.css';

const RecentActivity = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('/api/v1/book?sort_by=id&order_by=desc')
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setBooks(data.data);
                } else {
                    console.error('Failed to fetch recent activity.');
                }
            })
            .catch(error => {
                console.error('Error fetching recent activity:', error);
            });
    }, []);


    const truncateDescription = (description, maxLength = 100) => {
        if (description.length > maxLength) {
            return description.slice(0, maxLength) + '...';
        }
        return description;
    };

    return (
        <div className="recent-activity-list">
            {books.length > 0 ? (
                <Row>
                    {books.slice(0, 9).map((book) => (
                        <Col md={4} key={book.id} className="mb-4">
                            <Card className="book-card h-100">
                                <Card.Img
                                    variant="top"
                                    src={book.book_cover}
                                    alt={`${book.title} cover`}
                                    className="book-cover"
                                />
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text>
                                        <strong>{book.year}</strong> - {truncateDescription(book.description)}
                                    </Card.Text>
                                    <div className="user-info mt-auto">
                                        <img
                                            src={book.user.profile_picture}
                                            alt={`${book.user.name} profile`}
                                            className="user-profile-picture"
                                        />
                                        <span>{book.user.name}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>No recent activity available.</p>
            )}
        </div>
    );
};

export default RecentActivity;
