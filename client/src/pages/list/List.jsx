import React from "react";
import "./list.scss";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";

const List = () => {
  return (
    <div className="list">
      <Navbar />
      <div className="listcontainer">
        <div className="leaderboardcont">
          <Datatable />
        </div>
      </div>
    </div>
  );
};

export default List;
