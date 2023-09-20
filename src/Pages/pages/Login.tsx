function Login() {
  return (
    <form>
      <input type="email" data-testid="email-input" />
      <input type="password" data-testid="password-input" />
      <button data-testid="login-submit-btn">Enter</button>
    </form>
  );
}

export default Login;
