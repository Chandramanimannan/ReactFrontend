import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setToken(data.token);
        sessionStorage.setItem("role", data.role);
        setIsLoggedIn(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred during login.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  if (isLoggedIn) {
    return <div>{navigate("/dashboard")}</div>;
  } else {
    return (
      <>
        <div className="Auth-background">
          <div className="Auth-container">
            <div className="Auth-firstcontainer">
              <h1>Centpays</h1>
              <div className="AuthBG-img"></div>
            </div>
            <div className="Auth-secondcontainer">
              <div className="Auth-form">
                <h1>Login</h1>
                <div className="Auth-funtionality">
                  {error && <p className="alert">{error}</p>}
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button className="btn" onClick={handleLogin}>
                    Sign In
                  </button>
                </div>
                <a href="www.google.com">Forgotten Password?</a>
                <div className="line"></div>
                <div className="Authtoplink">
                  Create a new account.
                  <Link to="/Signup">
                    <span style={{ color: "blue" }}> Sign Up</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
