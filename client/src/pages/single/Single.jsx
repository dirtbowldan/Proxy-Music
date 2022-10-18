import React, { Suspense } from "react";
import "./single.scss";
import Navbar from "../../components/navbar/Navbar";

import Featured from "../../components/featured/Featured";

import { useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect } from "react";

import { useSelector } from "react-redux";
const Single = () => {
  const [authTokenSpotify, setAuthSpotify] = React.useState("");
  const location = useLocation();
  const userid = location.pathname.split("/")[2];

  const [albums, setAlbums] = React.useState([]);
  const [singles, setSingles] = React.useState([]);
  const [appearson, setAppears] = React.useState([]);
  const [currentArtist, setCurrentArtist] = React.useState({})
  let storeArtist = useSelector((state) => state.reducers.posts);
  let testshit = storeArtist.find((x) => x.id === userid)

  //Gets auth token from the spotify api

  async function getSpotify() {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Authorization",
      "Basic ZWI1ZGY1Y2EzZGZmNGUwZjlkNmQwNjQ1NWI3NThiZTc6ODdkOGY4YmU0ZThjNGRiMGEwOTMzOGQzZmViY2UyMzM="
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://accounts.spotify.com/api/token?grant_type=client_credentials",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => setAuthSpotify(JSON.parse(result).access_token))
      .catch((error) => console.log("error", error));
  }



  async function getApple(){

  }

  //Uses spotify auth to pull album info from artist page

  const getAlbums = async () => {
    let spotifyId = "";

    spotifyId = testshit.spotify;
    spotifyId = spotifyId.substring(
      spotifyId.lastIndexOf("/") + 1,
      spotifyId.length
    );

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + authTokenSpotify);

    var albumtemp = [];
    var singletemp = [];
    var appears = [];
    var res = {};

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      limit: 50,
    };

    // Api to spotify for all music "albums". this will include all music which we can sort later

    res = await fetch(
      "https://api.spotify.com/v1/artists/" + spotifyId + "/albums?limit=50",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => (res = result))
      .catch((error) => console.log("error", error));

    res = JSON.parse(res);

    //begin sorting all music items into 3 categories and places them into their relative array

    res.items.forEach((musicitem) => {
      //albums as designated by spotify

      if (musicitem.album_group === "album") {
        //an attempt to remove duplicates/nonexplict copies
        if (
          albumtemp.filter(
            (albumitem) => albumitem.date === musicitem.release_date
          ).length <= 0
        ) {
          if (
            albumtemp.filter((albumitem) => albumitem.name === musicitem.name)
              .length <= 0
          ) {
            albumtemp.push({
              name: musicitem.name,
              imgurl: musicitem.images[1].url,
              date: musicitem.release_date,
              url: musicitem.external_urls.spotify,
              artists: musicitem.artists,
            });
          }
        }
      }

      //singles as designated on spotify

      if (musicitem.album_group === "single") {
        if (
          singletemp.filter((singleitem) => singleitem.name === musicitem.name)
            .length <= 0
        ) {
          singletemp.push({
            name: musicitem.name,
            imgurl: musicitem.images[1].url,
            date: musicitem.release_date,
            url: musicitem.external_urls.spotify,
            artists: musicitem.artists,
          });
        }
      }

      //songs the artist is on but not released by them, gets rid of 3rd party compilations

      if (
        (musicitem.album_group === "appears_on") &
        (musicitem.album_type !== "compilation")
      ) {
        if (
          appears.filter((appearsitem) => appearsitem.name === musicitem.name)
            .length <= 0
        ) {
          appears.push({
            name: musicitem.name,
            imgurl: musicitem.images[1].url,
            date: musicitem.release_date,
            url: musicitem.external_urls.spotify,
            artists: musicitem.artists,
          });
        }
      }
    });

    // updates states here
    setAlbums(albumtemp);
    setSingles(singletemp);
    setAppears(appears);
  };

  useEffect(() => {
      setCurrentArtist(testshit)
    
}, []);



  //calling function to get auth token on page load or it will call for auth token infinitely

  useEffect(() => {
      
      getSpotify();
  }, [currentArtist]);

  //once auth token is acquired the function is called for getting music

  useEffect(() => {
    getAlbums();
  }, [authTokenSpotify]);

  //function for getting rank info from database

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <Navbar />
          <div className="row">
            <div className="col">
              <h1 className="artistTitle">{}</h1>
              <Featured currentArtist={testshit} />
            </div>
          </div>
          <div className="row m-5">
            <Suspense fallback={<h1>Loading Music</h1>}>
              <h3>Albums</h3>
              {albums.map((album) => (
                <div className="col">
                  <a className="album" href={album.url}>
                    <div className="img">
                      <img src={album.imgurl}></img>
                    </div>
                    <h5>{album.name}</h5>
                    {album.artists.map((artist) => (
                      <>{artist.name}</>
                    ))}
                    <div>{album.date}</div>
                  </a>
                </div>
              ))}
            </Suspense>
          </div>
          <div className="row m-5">
            <Suspense fallback={<h1>Loading Music</h1>}>
              <h3>Singles</h3>
              {singles.map((album) => (
                <div className="col">
                  <a className="album" href={album.url}>
                    <div className="img">
                      <img src={album.imgurl}></img>
                    </div>
                    <h5>{album.name}</h5>
                    {album.artists.map((artist) => (
                      <>{artist.name}</>
                    ))}
                    <div>{album.date}</div>
                  </a>
                </div>
              ))}
            </Suspense>
          </div>
          <div className="row m-5">
            <Suspense fallback={<h1>Loading Music</h1>}>
              <h3>Appears On</h3>
              {appearson.map((album) => (
                <div className="col">
                  <a className="album" href={album.url}>
                    <div className="img">
                      <img src={album.imgurl}></img>
                    </div>
                    <h5>{album.name}</h5>
                    {album.artists.map((artist) => (
                      <>{artist.name}</>
                    ))}
                    <div>{album.date}</div>
                  </a>
                </div>
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
