import { useState } from "react";
import "./Credential.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h1>Welcome Back!!!</h1>
      <p>Login your account inorder to add todos</p>
      <div className="loginPage">
        <form className="loginForm">
          <div className="emailInput">
            <label>Enter your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="passwordInput">
            <label>Enter your password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>
            Dont have an Account?{" "}
            <Link to={"/Signup"} className="linkToRegistrations">
              Register now
            </Link>
          </p>
          <button type="submit" className="loginButton">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
