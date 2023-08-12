import React, { useState } from 'react';
import './../styles/login.css'; // Import your CSS file for styling
import { app_url, axiosInstance } from '../config/helper';
import ToastComponent from '../components/global/ToastComponent';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(null);


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = { email, password };
      let response = await axiosInstance.post(app_url + "/login", loginData)
      console.log("response", response);
      sessionStorage.setItem('token', response.data.data.token);
      window.location.href = "/";
    } catch (error) {
      setToast({ message: "Email not found.", type: 'warning', variant: 'warning', link: '/Registration', goto: 'Go to Registration' })
      console.log(error);
    }


    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </div>
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
      </form>
    </div>
  );
};

export default LoginPage;
