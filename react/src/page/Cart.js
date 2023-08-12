import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { axiosInstance, app_url } from '../config/helper'; // Adjust path as needed
import ToastComponent from '../components/global/ToastComponent';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);


  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get(app_url + '/api/cart/getCart'); // Adjust API endpoint
      console.log("response", response);
      setCartItems(response.data.cartResponse);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    try {
      const updatedCartItems = cartItems.map((item) =>
        item.product_id._id === productId
          ? { ...item, quantities: Number(quantity) }
          : item
      );

      setCartItems(updatedCartItems);

      const response = await axiosInstance.put(
        app_url + '/api/cart/updateCart',
        {
          productId,
          quantity,
        }
      );
      if (response.data.status === 'success') {
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const createOrder = async () => {
    try {
      const response = await axiosInstance.post(
        app_url + '/api/cart/createOrder',
        { cartItems }
      );
      if (response.data.message === 'Cart data has been stored') {
        console.log('Order created successfully');
        return setToast({ message: "Order Created Successfully", type: 'success', variant: 'warning' })
      }
    } catch (error) {
      console.error('Error creating order:', error);
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
              <td>{item.product_id.title}</td>
              <td>
                <input
                  type="number"
                  value={item.quantities}
                  onChange={(e) =>
                    handleQuantityChange(item.product_id._id, e.target.value)
                  }
                />
              </td>
              <td>{item.product_id.price}</td>

              <td>{item.product_id.price * item.quantities}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={createOrder}>
        Order Now
      </Button>

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
};

export default Cart;
