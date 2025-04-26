function Login() {
    const handleSubmit = (e) => {
      e.preventDefault();
      // TODO: Send POST request to backend /api/login with username + password
    };
  
    return (
      <div>
        <h1>🔑 Login Page</h1>
  
        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" /><br/>
          <input type="password" placeholder="Password" /><br/>
          <button type="submit">Login</button>
        </form>
  
        {/* TODO: Show success or error message here */}
      </div>
    );
  }
  
  export default Login;