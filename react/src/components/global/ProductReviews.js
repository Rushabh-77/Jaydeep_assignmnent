import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ProductReviews = ({ reviews }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }

    return stars;
  };

  return (
    <div className='pt-4'>
      <ListGroup>
        {reviews.map((review, index) => (
          <ListGroup.Item key={index}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {renderStars(review.rating)}
              </div>
              <Badge pill variant="info">
                {review.rating} / 5
              </Badge>
            </div>
            <p>{review.text}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default ProductReviews;
