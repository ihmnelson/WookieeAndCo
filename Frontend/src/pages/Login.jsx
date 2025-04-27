import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const buttonStyle = {
    margin: '16px',
    padding: '1rem 6rem',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#5b4f6e',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#44395a',
  };

  const inputStyle = {
    margin: '8px 0',
    padding: '0.8rem',
    fontSize: '1.2rem',
    borderRadius: '8px',
    border: '2px solid #abc9f1',
    width: '100%',
    boxSizing: 'border-box',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/users/login/:id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Login successful!');
        // TODO: Redirect to dashboard/homepage or show success message
      } else {
        console.error('Login failed.');
        // TODO: Show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // TODO: Handle network errors
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: '100vh',
      paddingTop: '20vh',
      backgroundImage: `
        linear-gradient(90deg, #d3dee6 25%, transparent 25%, transparent 75%, #d3dee6 75%),
        linear-gradient(#d3dee6 25%, transparent 25%, transparent 75%, #d3dee6 75%)
      `,
      backgroundSize: '516px 516px',
      backgroundPosition: '0 0, 200px 200px',
      backgroundColor: '#e6ecef',
    }}>
      <div style={{
        border: '4px solid #abc9f1',
        padding: '4rem',
        borderRadius: '24px',
        backgroundColor: '#e6ecef',
        textAlign: 'center',
        width: '800px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <h1 style={{
          color: '#5b4f6e',
          fontSize: '7rem',
          marginTop: '0',
          marginBottom: '60px',
        }}>
          🔑 Login 🔑
        </h1>

        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Username"
            style={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Login
          </button>
        </form>

        <div style={{ marginTop: '16px' }}>
          <Link to="/signup" style={{ color: '#5b4f6e', fontWeight: '600', textDecoration: 'underline' }}>
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;