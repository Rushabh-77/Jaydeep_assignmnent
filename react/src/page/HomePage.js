import React, { useEffect, useState } from 'react';
import { app_url, axiosInstance } from '../config/helper';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(); // Call the getProducts function inside the useEffect hook
  }, []);

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get(app_url + "/products/getProduct");
      console.log(response)
      setProducts(response.data.data.prodResponse);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  return (
    <div>
      <h1>Product Page</h1>
      <Container>
        <Row >
          {products.map((product) => (
            <Col key={product._id} xs={6} md={4} style={{ margin: "10px 0px" }}>
              <a href={`/product/${product._id}`}>
                <Card style={{ width: '25rem' }}>
                  <Card.Img variant="top" height={'400px'} src={product.image} alt={product.title} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                      {product.description}
                    </Card.Text>
                    <p>Price: ${product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default Product;
