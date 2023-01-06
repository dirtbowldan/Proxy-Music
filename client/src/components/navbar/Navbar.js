import React, { useEffect, useState } from "react";
import "./navbar.scss";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MessageIcon from "@mui/icons-material/Message";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Navbar = ({ currentUser }) => {
  //logs out current user from navbar and rest of site
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleLogout = () => {
    
      dispatch({ type: "LOGOUT" });
      navigate(0)
  
  };

  useEffect(() => {
    const token = user?.jwtotken;

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  return (
    <div className="navbar1">
      <div className="wrapper">
        <a href="/">
          <h1 className="title">Proxy</h1>
        </a>
        <div className="links">
          <a className="item" href="">
            <div>Notifications</div>
            <div>
              <MessageIcon className="icon" />
            </div>
          </a>
          <a className="item" href="/users">
            <div>Leaderboard</div>
            <LeaderboardIcon className="icon" />
          </a>
          <a className="item" href="/register">
            <div>Register Artist</div>
            <AccountBoxIcon className="icon" />
          </a>
        </div>
        <div className="profile">
          {user ? (
            <div className="item">
              <div>Profile</div>
              <img
                height="50px"
                src={require("./avatar.png")}
                className="avatar"
              />
              <button type="submit" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          ) : (
            <a href="/new">Sign In</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
