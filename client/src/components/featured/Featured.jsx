import React from "react";
import "./featured.scss";

import "./glowborder.css";

const Featured = ({ currentArtist }) => {
  const [rank, setRank] = React.useState(0);
  const [staterank, setStateRank] = React.useState(0);
  const [cityrank, setCityRank] = React.useState(0);
  const [frank, setfRank] = React.useState(0);
  const [fstaterank, setfStateRank] = React.useState(0);
  const [fcityrank, setfCityRank] = React.useState(0);
  const [img, setimg] = React.useState("");
  //retrieves data to be shown in the featured component

  const fetchData = async () => {
    setRank(currentArtist.oprank);
    setStateRank(currentArtist.sprank);
    setCityRank(currentArtist.cprank);
    setfRank(currentArtist.ofrank);
    setfStateRank(currentArtist.sfrank);
    setfCityRank(currentArtist.cfrank);
   
  };

  React.useEffect(() => {
    fetchData();
  });

  return (
    <div className="container featured">
      <div className="row gx-5 d-flex ">
        <div className="col d-flex flex-column justify-content-center align-items-center overallRank">
          <div className="overall">
            <div className="itemtitle">Overall Rank</div>
            <div className="itemresult">
              <div className="resultamount">{rank}</div>
            </div>
          </div>
        </div>

        <div className="col tit ">Stream Ranks</div>
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <div className="item">
            <div className="itemtitle">Country</div>
            <div className="itemresult">
              <div className="resultamount">{rank}</div>
            </div>
          </div>
        </div>
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <div className="item">
            <div className="itemtitle">State</div>
            <div className="itemresult">
              <div className="resultamount">{staterank}</div>
            </div>
          </div>
        </div>
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <div className="item">
            <div className="itemtitle">City</div>
            <div className="itemresult">
              <div className="resultamount">{cityrank}</div>
            </div>
          </div>
        </div>

        <div className="col tit">Follower Ranks</div>

        <div className=" col d-flex flex-column justify-content-center align-items-center">
          <div className="item">
            <div className="itemtitle">Country</div>
            <div className="itemresult">
              <div className="resultamount">{frank}</div>
            </div>
          </div>
        </div>
        <div className=" col d-flex flex-column justify-content-center align-items-center ">
          <div className="item">
            <div className="itemtitle">State</div>
            <div className="itemresult">
              <div className="resultamount">{fstaterank}</div>
            </div>
          </div>
        </div>
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <div className="item">
            <div className="itemtitle">City</div>
            <div className="itemresult">
              <div className="resultamount">{fcityrank}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
