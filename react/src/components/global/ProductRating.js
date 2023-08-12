import React, { useState } from 'react';
import { Card, Badge, Button, Modal, Form, Stack } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { app_url, axiosInstance } from '../../config/helper';

const ProductRating = ({ averageRating, product_id }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key={stars.length} />);
    }

    while (stars.length < 5) {
      stars.push(<FaRegStar key={stars.length} />);
    }

    return stars;
  };

  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');

  // State for controlling the review modal
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleAddReview = async () => {
    try {
      let registerObj = {
        product_id: product_id,
        text: userReview,
        rating: userRating,
      }
      await axiosInstance.post(app_url + '/api/comment/createComments', registerObj)

      // Reset user input
      setUserRating(0);
      setUserReview('');
      // Close the modal
      handleCloseReviewModal();
    } catch (error) {
      console.log(error)
    }
  };
  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    // Reset user input when the modal is closed
    setUserRating(0);
    setUserReview('');
  };


  return (
    <Card>
      <Card.Body>
        <Card.Title>Product Rating</Card.Title>
        <Stack direction="horizontal" gap={3}>
          <Badge pill variant="info">
            {renderStars(averageRating)} ({averageRating.toFixed(1)} / 5)
          </Badge>
          <Button variant="primary" size="sm" onClick={() => setShowReviewModal(true)} className="ml-3">
            Add New Review
          </Button></Stack>
      </Card.Body>
      {/* Review modal */}
      <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="userRating">
              <Form.Label>Rating</Form.Label>
              <div>
                {[1, 2, 3, 4, 5].map((index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      value={index}
                      checked={userRating === index}
                      onChange={() => setUserRating(index)}
                    />
                    {index % 1 === 0 ? <FaStar /> : <FaStarHalfAlt />}
                  </label>
                ))}
              </div>
            </Form.Group>
            <Form.Group controlId="userReview">
              <Form.Label>Your Review</Form.Label>
              <Form.Control as="textarea" value={userReview} onChange={(e) => setUserReview(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReviewModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddReview}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default ProductRating;
