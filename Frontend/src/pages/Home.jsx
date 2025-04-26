import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>🏠 Home Page</h1>

      {/* Navigation buttons */}
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>

      {/* You can add some welcome text or images here */}
    </div>
  );
}

export default Home;