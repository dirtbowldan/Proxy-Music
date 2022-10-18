import React from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Datatable from "../../components/datatable/Datatable";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Home = ({ currentUser }) => {
  return (
    <div className="home">
      <div className="container-fluid">
        <Navbar currentUser={currentUser} />

        <div className="row">
          <div className="top col">
            <h1>Welcome to Proxy Music</h1>
            <h3>Artist Database / Leaderboard</h3>
            <hr></hr>
            <p className="desc">
              Due to the overwhelming amount of advertising by large music
              labels, independent artists of all sizes have a hard time getting
              equal exposure; Proxy Music is meant to level the playing field
              and bring a sense of community back to the music scene. Timestamp
              when you discover new artists, share them with your friends, and
              get notified when your favorites drop new music! 
            </p>

            <hr></hr>
            <a className="loginlink" href="/login">
              Already have an account? Login here
            </a>
          </div>
        </div>

        <div className="row p-2">
          <div className="col">
            <Widget
              title="Artist of the Day"
              bottomleft={"Dirtbowl"}
              link={"/aotd"}
              imglink={
                "https://pbs.twimg.com/media/FRryBh-XMAQ7fRk?format=jpg&name=large"
              }
            />
          </div>
          <div className="col">
            <Widget
              title="City of the Week"
              bottomleft={"Memphis"}
              link={"/cotd"}
              imglink={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Memphis_Skyline_at_Night_January_2015.jpg/288px-Memphis_Skyline_at_Night_January_2015.jpg"
              }
            />
          </div>
          <div className="col">
            <Widget
              title="State of the Month"
              bottomleft={"NY"}
              link={"/sotm"}
              imglink={
                "https://cdn.britannica.com/14/3014-004-BD154711/flag-New-York-color-uniforms-facings-American-1909.jpg"
              }
            />
          </div>
        </div>

        <div className="row-lg-8">
          <div className="listContainer">
            <div className="listtitle">The Fame score comes from Spotify's popularity score that takes into account streams and recent releases. PCR = Popularity City Rank. 
            FCR = Follower City Rank. PSR = Popularity State Rank. FSR = Follower State Rank. To filter by location hover over city or state and click the 3 dots to see "Filter" and then type the name. Clicking the X will remove the filter, to hide it just click somewhere else on the screen.</div>
            <Datatable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
