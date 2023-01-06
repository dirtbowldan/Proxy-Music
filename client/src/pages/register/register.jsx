import React, { useEffect } from "react";
import "./new.scss";
import { useDispatch, useSelector } from 'react-redux';
import Navbar from "../../components/navbar/Navbar";
import { createArtist, updatePost } from '../../actions/posts';



const New = ({ inputs }) => {
  
  const [data, setData] = React.useState({});
  const [upload, setUpload] = React.useState(null);
  const dispatch = useDispatch();
  //creates  a unique id from the users spotify and apple ids and if they dont have one it randomly generates one

  function makeid(length) {
    var result = "";

    if (data["spotify"] !== undefined && data["applemusic"] !== undefined) {
      var sId = data["spotify"];
      var aId = data["applemusic"];
      sId = sId.substring(sId.lastIndexOf("/") + 1, sId.length);

      aId = aId.substring(aId.lastIndexOf("/") + 1, aId.length);

      result = sId + aId;
    } else {
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
    }

    return result;
  }

  const clear = () => {
    
    setData({});
  };

  //Handles form input on change
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };
  const [authTokenSpotify, setAuthSpotify] = React.useState("");
  let authToken = "";

  //Gets spotify api to get profile image from spotify account


  //Adds new rapper into database and adds information from spotify api like popularity and followers

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log("artist info on send", data)
    dispatch(createArtist(data));
      
  };

  

  return (
    <div className="reg">
      <div className="row">
        <div className="bottom col">
          <h2>Artist Signup</h2>
          <p>
            Please enter Independent if you are not part of a label or group
          </p>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <img
                  className="inputimg"
                  src={"blank.img"}
                />
                <label htmlFor="file">Profile Pic</label>
                <input
                  className="filedrop"
                  type="file"
                  id="file"
                  placeholder=""
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}

              <div className="formInput" key={"state"}>
                <label>State</label>
                <select id="state" onChange={handleInput}>
                  <option value="none">Select State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              <div className="formInput" key={"city"}>
                <label>City</label>
                <input
                  id="city"
                  type="text"
                  placeholder="ex: Los Angeles"
                  onChange={handleInput}
                />
              </div>

              <button disabled={upload !== null && upload < 100} type="submit">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
