import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { app_url, axiosInstance } from '../config/helper';
import '../styles/userProfile.css';

const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get(app_url + "/api/user/getUserProfile");

      setFullName(response.data.userResponse.first_name);
      setEmail(response.data.userResponse.email);
      setShippingAddress(response.data.userResponse.shipping_address);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      let userObj = {
        full_name: fullName,
        email,
        shipping_address: shippingAddress
      }

      const response = await axiosInstance.put(app_url + "/api/user/updateUserProfile", userObj);
      console.log("responseee", response);

      if (response.data.status == "200") {
        setIsEditMode(false);
      } else {
        console.error('Error updating user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <Container className="user-profile">
      <Row>
        <Col>
          <h2>User Profile</h2>
          <Form>
            <Form.Group controlId="fullName">
              <Row>
                <Col>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={fullName}
                    disabled={!isEditMode}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    disabled={!isEditMode}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="shippingAddress">
              <Form.Label>Shipping Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={shippingAddress}
                disabled={!isEditMode}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
            </Form.Group>
            {isEditMode ? (
              <Button variant="primary" onClick={handleSaveClick}>
                Save
              </Button>
            ) : (
              <Button variant="info" onClick={handleEditClick}>
                Edit Profile
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
