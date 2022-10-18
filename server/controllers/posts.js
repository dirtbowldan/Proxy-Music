import express from "express";
import mongoose from "mongoose";

import PostArtist from "../models/postArtist.js";
import { getSpotify, getSpotifyInfo, updateRanks, makeid } from "../spotify.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const postArtist = await PostArtist.find();
    
    res.status(200).json(postArtist);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostArtist.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createArtist = async (req, res) => {
  const { artist, genre, group, spotify, applemusic, state, city, soundcloud } =
    req.body;
  let spotifyAuth = await getSpotify();
  var spotifyId = spotify;
  spotifyId = spotifyId.substring(
    spotifyId.lastIndexOf("/") + 1,
    spotifyId.length
  );
  let newinfo = await getSpotifyInfo(spotifyAuth, spotifyId);
  let pid = makeid(spotify, applemusic)
  
  const newPostMessage = new PostArtist({
    artist,
    genre,
    group,
    spotify,
    applemusic,
    state,
    city,
    popularity: newinfo.popularity,
    followers: newinfo.followers,
    img: newinfo.img,
    id:pid
  });
  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
  updateRanks()
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const updatedPost = await PostArtist.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  res.json(updatedPost);
};

export default router;
