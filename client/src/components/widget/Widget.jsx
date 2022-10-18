import { height } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import "./widget.scss";

const Widget = ({ title, bottomleft, link, imglink }) => {
  

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{title}</span>
        <span className="artist">{bottomleft}</span>
      </div>

      <div className="middle">
        <img src={imglink}></img>
      </div>
      <div className="right">
        <Link to={'/' + link} className="link" style={{ textDecoration: "none"}}>
          <span>Discover</span>
        </Link>
      </div>
    </div>
  );
};

export default Widget;
