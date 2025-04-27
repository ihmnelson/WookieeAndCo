import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <-- import Link

function UserSearch() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([
    { name: 'Alice', streak: 5, blackouts: 2 },
    { name: 'Bob', streak: 12, blackouts: 0 },
    { name: 'Charlie', streak: 3, blackouts: 1 },
    { name: 'David', streak: 7, blackouts: 4 },
    { name: 'Eve', streak: 15, blackouts: 0 },
  ]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

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
      position: 'relative', // <-- important to position the top-right button
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: '100vh',
      paddingTop: '10vh',
      backgroundImage: `
        linear-gradient(90deg, #d3dee6 25%, transparent 25%, transparent 75%, #d3dee6 75%),
        linear-gradient(#d3dee6 25%, transparent 25%, transparent 75%, #d3dee6 75%)
      `,
      backgroundSize: '516px 516px',
      backgroundPosition: '0 0, 200px 200px',
      backgroundColor: '#e6ecef',
      overflowY: 'auto', // Keep the scroll for the user list
    }}>
      {/* Small "Home" button */}
      <Link to="/">
        <button
          style={smallButtonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = smallButtonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = smallButtonStyle.backgroundColor}
        >
          Home
        </button>
      </Link>

      <div style={{
        border: '4px solid #abc9f1',
        padding: '3rem',
        borderRadius: '24px',
        backgroundColor: '#e6ecef',
        textAlign: 'center',
        width: '800px',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h1 style={{
          color: '#5b4f6e',
          fontSize: '5rem',
          marginBottom: '32px'
        }}>
          Find Users
        </h1>

        <input
          type="text"
          placeholder="Search by username..."
          value={query}
          onChange={handleSearch}
          style={{
            marginBottom: '24px',
            padding: '1rem',
            width: '500px',
            fontSize: '1.5rem',
            borderRadius: '12px',
            border: '2px solid #abc9f1',
            outline: 'none',
            textAlign: 'center',
          }}
        />

        <div style={{
          width: '100%',
          maxHeight: '400px',
          overflowY: 'auto',
          paddingRight: '16px',
        }}>
          {filteredUsers.map((user, index) => (
            <div key={index} style={{
              backgroundColor: '#ffffff',
              border: '2px solid #abc9f1',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '1.5rem',
              color: '#5b4f6e',
              fontWeight: '500',
            }}>
              <span>{user.name}</span>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <span>Streak: {user.streak}</span>
                <span>Blackouts: {user.blackouts}</span>
              </div>
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <div style={{
              color: '#5b4f6e',
              fontSize: '2rem',
              marginTop: '2rem',
            }}>
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserSearch;