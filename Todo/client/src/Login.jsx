import { useState } from "react";
import "./Credential.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const val = await response.json();
      console.log(val);
      if (val.status) {
        toast.success("User Logged In Successfully");
        localStorage.setItem("Token", val.data.token);
        navigate("/todos");
      } else {
        toast.error("User Registration failed");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div>
      <h1>Welcome Back!!!</h1>
      <p>Login your account inorder to add todos</p>
      <div className="loginPage">
        <form className="loginForm" onSubmit={(e) => LoginUser(e)}>
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
