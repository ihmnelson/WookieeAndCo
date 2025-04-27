import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
  const buttonStyle = {
    margin: '12px',
    padding: '0.5rem 0',
    width: '600px',
    fontSize: '2rem',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#5b4f6e',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    textAlign: 'center',
  };

  const buttonHoverStyle = {
    backgroundColor: '#44395a',
  };

  const smallButtonStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '0.5rem 1rem',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#5b4f6e',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const smallButtonHoverStyle = {
    backgroundColor: '#44395a',
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scrolling when the component unmounts
    };
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <div style={{
      position: 'relative',
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
      {/* Small search button */}
      <Link to="/user-search">
        <button
          style={smallButtonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = smallButtonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = smallButtonStyle.backgroundColor}
        >
          Search Users
        </button>
      </Link>

      {/* Main box */}
      <div style={{
        border: '4px solid #abc9f1',
        padding: '4rem',
        borderRadius: '24px',
        backgroundColor: '#e6ecef',
        textAlign: 'center',
        width: '800px',
        height: '455px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <h1 style={{
          color: '#5b4f6e',
          fontSize: '8rem',
          marginTop: '-42px',
          marginBottom: '32px'
        }}>
          Healthy Habits Bingo
        </h1>

        <div>
          <Link to="/game">
            <button
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
            >
              Game
            </button>
          </Link>
          <Link to="/signup">
            <button
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
            >
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;