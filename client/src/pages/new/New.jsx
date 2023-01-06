import React, { useEffect } from "react";
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {signin, signup} from "../../actions/auth"
import jwt_decode from "jwt-decode";
var axios = require("axios");
const New = ({ inputs }) => {
  const [data, setData] = React.useState({email: "", password: ""});
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    dispatch(signup(data, navigate))
  };

  const googleSuccess = (decoded, jwtotken) => {
   

    try {
      dispatch({ type: "AUTH", data: { decoded, jwtotken } });

      navigate('/')
    } catch (error) {}
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("fail");
  };

  return (
    <div className="new">
    
      <div className="newContainer row">
        
        <div className="top col">
          <Navbar /><h1>Welcome to Proxy Music</h1>
          <h3>A simple artist database</h3>
        </div>
        <div className="bottom col">
          <h2>User Signup</h2>
          <p>Thank you for joining our community!</p>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label>Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="test@gmail.com"
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  onChange={handleInput}
                />
              </div>
              <button>Sign Up</button>
              <button>Sign In</button>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  var decoded = jwt_decode(credentialResponse.credential);
                  let jwtotken = credentialResponse.credential
                  googleSuccess(decoded, jwtotken)
                 

                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
