import React, { useContext } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  //to make sure you are logged in to go specific pages

  const { dispatch } = useContext(AuthContext);
  
  //Handles firebase auth and gets users credentials
  
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  
  return (
    <div className="loggy">
      <h1 className="titlelogin">PROXY</h1>
      <h2 className="welcome">Welcome Back</h2>
      <div className="login">
        <h1>Login</h1>
        <p>Employers please login with email: test@test.com pw: test1234</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <span>Wrong Email or password</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
