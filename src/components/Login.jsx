// Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './LoginContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const { isLoggedIn, login: loginContext } = useLogin();  // Use the context here
  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('loginvalue') === 'true') {
      nav('/home');
    }
  }, [nav]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    if (password.length < 7) {
      alert('Password must be at least 7 characters long');
      return;
    }

    alert('Login successful');
    loginContext();  // Set the login context to true
    nav('/home');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '900px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2>Login</h2>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{ padding: '10px', marginBottom: '10px', borderRadius: '4px' }}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={{ padding: '10px', marginBottom: '20px', borderRadius: '4px' }}
        />

        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
