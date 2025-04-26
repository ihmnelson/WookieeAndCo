import { Link } from 'react-router-dom';

function Home() {
  const buttonStyle = {
    margin: '12px',
    padding: '1rem 0', // remove horizontal padding
    width: '600px',       // <-- set fixed width
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

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: '100vh',
      paddingTop: '20vh',  // reduced from 20vh to 5vh
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
        height: '455px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <h1 style={{ 
          color: '#5b4f6e', 
          fontSize: '8rem', 
          marginTop: '-42px',       // no top margin
          marginBottom: '32px'  // small gap below the title
        }}>
          Healthy Habits Bingo 
        </h1>

        <div>
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