import axios from "axios";
import qs from "qs";
import request from "request";

import express from "express";
import mongoose from "mongoose";

import PostArtist from "./models/postArtist.js";
//Gets spotify api to get profile image from spotify account
export async function getSpotify() {
  let authToken = "";

  var config = {
    method: "post",
    url: "https://accounts.spotify.com/api/token?grant_type=client_credentials",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic ZWI1ZGY1Y2EzZGZmNGUwZjlkNmQwNjQ1NWI3NThiZTc6ODdkOGY4YmU0ZThjNGRiMGEwOTMzOGQzZmViY2UyMzM=",
    },
  };

  await axios(config)
    .then(function (response) {
      authToken = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return authToken.access_token;
}

export async function getSpotifyInfo(authToken, spotifyId) {
  let theinfo = {
    followers: 0,
    popularity: 0,
    img: "",
  };
  var config = {
    method: "get",
    url: "https://api.spotify.com/v1/artists/" + spotifyId,
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };

  await axios(config)
    .then(function (response) {
      theinfo.followers = response.data.followers.total;
      theinfo.popularity = response.data.popularity;
      theinfo.img = response.data.images[1].url;
    })
    .catch(function (error) {
      console.log(error);
    });
  return theinfo;
}

export async function updateRanks() {
  //filter by all
  const postArtist = await PostArtist.find();

  //sorting by popularity
  const sorted = postArtist.sort((a, b) => {
    return b.popularity - a.popularity;
  });
  var count = 0;
  for (var artist of sorted) {
    count += 1;
    const updatedPost = await PostArtist.findByIdAndUpdate(
      artist._id,
      { oprank: count },
      { new: true }
    );
  }

  //sorting by followers
  const fsorted = postArtist.sort((a, b) => {
    return b.followers - a.followers;
  });
  count = 0;
  for (var artist of fsorted) {
    count += 1;
    const updatedPost = await PostArtist.findByIdAndUpdate(
      artist._id,
      { ofrank: count },
      { new: true }
    );
  }
  
  sortState();

}

async function sortState() {
  const artists = await PostArtist.find();
  let sortedStates = [];
  //filter by state
  for (let i = 0; i < artists.length; i++) {
    let currst = artists[i].state;
    let starray = []
    if (!sortedStates.includes(currst)) {
      console.log(currst)
      starray = artists.filter((artist) => artist.state === currst);
      console.log(starray)
      //sort by popularity
      let stsorted = starray.sort((a, b) => {
        return b.popularity - a.popularity;
      });
      //sort by followers
      let stfsorted = starray.sort((a, b) => {
        return b.followers - a.followers;
      });

      let scount = 0;
      for (var artist of stsorted) {
        scount += 1;
        const updatedst = await PostArtist.findByIdAndUpdate(
          artist._id,
          { sprank: scount },
          { new: true }
        );
      }
      scount = 0;
      for (var artist of stfsorted) {
        scount += 1;
        const updatedst = await PostArtist.findByIdAndUpdate(
          artist._id,
          { sfrank: scount },
          { new: true }
        );
      }
    }
  await sortCity(starray)
  sortedStates.push(currst)
  }
}

async function sortCity(artists) {
  
  let sortedCities = [];
  for (let i = 0; i < artists.length; i++) {
    let currc = artists[i].city;
    console.log(currc)
    if (!sortedCities.includes(currc)) {

      let carray = artists.filter((artist) => artist.city === currc);
      
      //sort by popularity
      let stsorted = carray.sort((a, b) => {
        return b.popularity - a.popularity;
      });
      //sort by followers
      let stfsorted = carray.sort((a, b) => {
        return b.followers - a.followers;
      });
      let scount = 0;
      for (var artist of stsorted) {
        scount += 1;
        const updatedst = await PostArtist.findByIdAndUpdate(
          artist._id,
          { cprank: scount },
          { new: true }
        );
      }
      scount = 0;
      for (var artist of stfsorted) {
        scount += 1;
        const updatedst = await PostArtist.findByIdAndUpdate(
          artist._id,
          { cfrank: scount },
          { new: true }
        );
      }
      sortedCities.push(currc);
    }
  }
}


export function makeid(spotify, applemusic) {
  var result = "";

  if (spotify !== "" && applemusic !== "") {
    var sId = spotify;
    var aId = applemusic;
    sId = sId.substring(sId.lastIndexOf("/") + 1, sId.length);

    aId = aId.substring(aId.lastIndexOf("/") + 1, aId.length);

    result = sId + aId;
  } else {
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 20; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
  }

  return result;
}
