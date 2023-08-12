import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { axiosInstance, app_url } from '../config/helper'; // Adjust path as needed

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get(app_url + '/api/cart'); // Adjust API endpoint
      setCartItems(response.data.cartItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleQuantityChange = async (itemId, quantity) => {
    try {
      const response = await axiosInstance.put(app_url + '/api/cart/update', {
        itemId,
        quantity,
      });
      if (response.data.status === 'success') {
        fetchCart();
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <Container>
      <h2>Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>{item.productName}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item._id, e.target.value)
                  }
                />
              </td>
              <td>{item.price}</td>
              <td>{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary">Order Now</Button>
    </Container>
  );
};

export default Cart;
