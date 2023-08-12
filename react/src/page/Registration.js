import React, { useState } from 'react';
import './../styles/registration.css'; // Import your CSS file for styling
import { app_url, axiosInstance } from '../config/helper';

const RegistrationPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let registerObj = {
      first_name: fullName,
      email: email,
      password: password,
      shipping_address: shippingAddress,
    }
    let regitrationData = await axiosInstance.post(app_url + '/register', registerObj)
    console.log("registrationnnnn", regitrationData.data.status == "201");
    if (regitrationData.data.status == "201") {
      window.location.href = "/login";
    }

    setFullName('');
    setEmail('');
    setPassword('');
    setShippingAddress('')
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={handleFullNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="shippingAddress">Shipping Address:</label>
          <textarea
            id="shippingAddress"
            value={shippingAddress}
            onChange={handleShippingAddressChange}
            rows={4}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
