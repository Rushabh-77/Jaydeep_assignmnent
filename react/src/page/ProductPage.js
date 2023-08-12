import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button, Modal, Form, Card, Alert } from 'react-bootstrap';
import { app_url, axiosInstance } from '../config/helper';
import { useParams, useSearchParams } from 'react-router-dom';

const ProductPage = () => {
  const { product_id } = useParams();
  // State for tracking the quantity in the cart
  const [product, setProduct] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [alertWiget, setAlertWiget] = useState(null);

  // State for tracking the user's review
  const [userReview, setUserReview] = useState('');

  // State for controlling the review modal
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    getProduct()
  }, [])

  const handleCartQuantityChange = (event) => {
    setCartQuantity(parseInt(event.target.value));
  }

  const getProduct = async () => {
    try {
      const response = await axiosInstance.get(app_url + "/api/products/getProduct/" + product_id);
      console.log(response.data.data.prodResponse)
      setProduct(response.data.data.prodResponse);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to handle increasing quantity
  const handleIncreaseQuantity = () => {
    setCartQuantity((prevQty) => prevQty++);
  };

  // Function to handle decreasing quantity
  const handleDecreaseQuantity = () => {
    setCartQuantity((prevQty) => prevQty--);
  };

  const addToCart = async (prodId, quantity) => {
    
    let cartObj = {
      id: prodId,
      quantity: quantity
    }
    let cartData = await axiosInstance.post(app_url + '/api/cart/addToCart', cartObj)
    if (cartData) {
    }
  }

  const handleReviewSubmit = () => {
    // Implement the logic to submit the user's review
    // You can store the review in a state or send it to a server
    // Reset the userReview state after submitting
    setUserReview('');
    setShowReviewModal(false);
  }

  return (
    <Container className='p-4' >
      {product ?
        <><Row >
          <Col md={6}>
            {/* Side image */}
            <Image src={product.image} width={"100%"} height={"400px"} alt="Product" />
          </Col>
          <Col md={6}>
            {/* Product description */}
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <div>
              <button onClick={() => handleDecreaseQuantity(product.id)}>-</button>
              <Form.Control width={"50px"} type="number" min={1} value={cartQuantity} onChange={handleCartQuantityChange} />
              <button onClick={() => handleIncreaseQuantity(product.id)}>+</button>
              <Button onClick={() => addToCart(product.id, cartQuantity)}>Add to Cart</Button>
            </div>
          </Col>
        </Row>
          <Row>
            <Col>
              {/* Comments and reviews section */}
              <h3>Comments and Reviews</h3>
              {/* Render existing reviews */}
              {/* Add a button to open the review modal */}
              <Button onClick={() => setShowReviewModal(true)}>Add a Review</Button>
            </Col>
          </Row>
          {/* Review modal */}
          <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add a Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="userReview">
                  <Form.Label>Your Review</Form.Label>
                  <Form.Control as="textarea" value={userReview} onChange={(e) => setUserReview(e.target.value)} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleReviewSubmit}>
                Submit Review
              </Button>
            </Modal.Footer>
          </Modal></>
        :
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Product not found</Card.Title>
            <Card.Text>
              Product not found please go to product list
            </Card.Text>
            <Button href='/' variant="primary">Go Home</Button>
          </Card.Body>
        </Card>
      }
      {alertWiget ?
        <Alert key="success" variant="success">
          Product Added to cart <Alert.Link href="/cart">Go To Cart</Alert.Link>.
        </Alert>
        : null
      }

    </Container>
  );
}

export default ProductPage;
