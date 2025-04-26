function Signup() {
    const handleSubmit = (e) => {
      e.preventDefault();
      // TODO: Send POST request to backend /api/signup with username + password
    };
  
    return (
      <div>
        <h1>📝 Signup Page</h1>
  
        {/* Signup form */}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" /><br/>
          <input type="password" placeholder="Password" /><br/>
          <button type="submit">Sign Up</button>
        </form>
  
        {/* TODO: Show success or error message here */}
      </div>
    );
  }
  
  export default Signup;