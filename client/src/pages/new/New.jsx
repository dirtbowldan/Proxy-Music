import React, { useEffect } from "react";
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useNavigate } from "react-router-dom";

import {
  doc,
  setDoc,
  addDoc,
  collection,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
var axios = require("axios");
const New = ({ inputs }) => {
  const [file, setFile] = React.useState("");
  const [data, setData] = React.useState({});
  const [per, setPer] = React.useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPer(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e) => {
    console.log(e);
    const id = e.target.id;
    const value = e.target.value;
    console.log(value);
    setData({ ...data, [id]: value });
  };
  let navigate = useNavigate();
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(data);
    const res = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    let path = "/";
    navigate("/");
  };
  return (
    <div className="new">
      <div className="newContainer row">
        <div className="top col">
          <h1>Welcome to Proxy Music</h1>
          <h3>A simple artist database</h3>
        </div>
        <div className="bottom col">
          <h2>User Signup</h2>
          <p>Thank you for joining our community!</p>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label>Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="test@gmail.com"
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  onChange={handleInput}
                />
              </div>

              <button disabled={per !== null && per < 100} type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
