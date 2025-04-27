import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login';
import Game from './pages/Game';
import UserSearch from './pages/UserSearch'; // <-- add this line

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} />
        <Route path="/user-search" element={<UserSearch />} /> {/* <-- add this route */}
      </Routes>
    </Router>
  );
}

export default App;