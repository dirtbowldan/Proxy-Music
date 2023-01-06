import express from "express";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "../models/user.js";
const router = express.Router();

export const signin = async (req, res) => {
  try {
    const {email, password} = req.body
     const existingUser = await User.findOne({email})
    
    if(!existingUser) return res.status(404).json({message: 'user doesnt exist'})
    
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password )

    if(!isPasswordCorrect) return res.status(400).json({message: 'password doesnt match'})
    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, "secret", )
     res.status(200).json();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
    try {
      
      
      res.status(200).json();
      
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
