import { useState } from "react";
import "./Credential.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const RegisterUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      if (response.status === 201) {
        toast.success("User Registered Successfully");
        navigate("/");
      } else {
        toast.error("User Registration failed");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <h1>Register Here!!!</h1>
      <p>Register account inorder to login</p>
      <div className="loginPage">
        <form className="loginForm" onSubmit={(e) => RegisterUser(e)}>
          <div className="userNameInput">
            <label>Enter your Full Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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

export default Signup;
