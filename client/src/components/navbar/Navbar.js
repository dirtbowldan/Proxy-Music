import React from "react";
import "./navbar.scss";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MessageIcon from "@mui/icons-material/Message";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Navbar = ({ currentUser }) => {
  
  //logs out current user from navbar and rest of site
  
  const handleLogout = () => {
    localStorage.setItem("user", JSON.stringify(""));
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
