import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button, Modal, Form, Card, Alert, Stack } from 'react-bootstrap';
import { app_url, axiosInstance } from '../config/helper';
import { useParams, useSearchParams } from 'react-router-dom';
import ToastComponent from '../components/global/ToastComponent';
import ProductRating from '../components/global/ProductRating';
import ProductReviews from '../components/global/ProductReviews';

const ProductPage = () => {
  const { product_id } = useParams();
  // State for tracking the quantity in the cart
  const [product, setProduct] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [toast, setToast] = useState(null);
  const [reviews, setReviews] = useState([]);


  useEffect(() => {
    getProduct()
  }, [])

  const handleCartQuantityChange = (event) => {
    setCartQuantity(parseInt(event.target.value));
  }

  const getProduct = async () => {
    try {
      const response = await axiosInstance.get(app_url + "/products/getProduct/" + product_id);
      console.log(response.data.data.prodResponse)
      setProduct(response.data.data.prodResponse);
      setReviews(response.data.data.comments)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to handle increasing quantity
  const handleIncreaseQuantity = () => {
    setCartQuantity(cartQuantity + 1);
  };

  // Function to handle decreasing quantity
  const handleDecreaseQuantity = () => {
    setCartQuantity(cartQuantity - 1);
  };

  const addToCart = async (prodId, quantity) => {
    let cartObj = {
      productId: prodId,
      quantity: quantity
    }
    if (!sessionStorage.getItem('token')) {
      return setToast({ message: "Please login to add product into cart.", type: 'warning', variant: 'warning', link: '/login', goto: 'Go to Login' })
    }
    // let cartData = await axiosInstance.post(app_url + '/api/cart/addToCart', cartObj)
    if (true) setToast({ message: "Product added to cart.", type: 'Light', variant: 'light', link: '/cart', goto: 'Go to Cart' })
  }



  return (
    <Container className='p-4'>
      {product ?
        <>
          <Row >
            <Col md={6}>
              {/* Side image */}
              <Image src={product.image} width={"100%"} height={"400px"} alt="Product" />
            </Col>
            <Col md={6}>
              {/* Product description */}
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <Stack direction="horizontal" gap={3} >
                <Stack direction="horizontal" gap={3} content='start' >
                  <Button disabled={cartQuantity == 0} onClick={() => handleDecreaseQuantity()}>-</Button>
                  <Form.Control type="number" min={1} value={cartQuantity} onChange={handleCartQuantityChange} />
                  <Button onClick={() => handleIncreaseQuantity()}>+</Button>
                </Stack>
                <Button onClick={() => addToCart(product._id, cartQuantity)}>Add to Cart</Button>
              </Stack>
            </Col>
          </Row>
          <Row className='p-4'>
            <Col md={6}>
              {/* Comments and reviews section */}
              <h3>Comments and Reviews</h3>
              {/* Product rating */}
              <ProductRating averageRating={3} product_id={product._id} />
              {/* Product reviews */}
              <ProductReviews reviews={reviews} />
              {/* Add a button to open the review modal */}

            </Col>
          </Row>
        </>
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
      {toast ? <ToastComponent
        title={"Take Action."}
        type={toast.type}
        variant={toast.variant}
        message={toast.message}
        onClose={() => setToast(null)}
        link={toast.link}
        goto={toast.goto}
      />
        : null}

    </Container>
  );
}

export default ProductPage;
