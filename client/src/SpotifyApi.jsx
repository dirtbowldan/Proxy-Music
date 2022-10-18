import React from "react";
import { useState } from "react";
const SpotifyApi = () => {

    // WARNING: For POST requests, body is set to null by browsers.
    const [authToken, setAuthToken] = React.useState('')
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        
      }
    });
    
    xhr.open("POST", "https://accounts.spotify.com/api/token?grant_type=client_credentials");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", "Basic YjNlYTJjODNmZGFjNGU0MWE2OTkwZGM4YWIzNTg5MTU6ZTBiNjQ2ZjQxZjMxNDg5ZmIwYjYzOTNkODM4NzI2MzU=");
    
    xhr.send();



    

return (<div>Shitter :{}</div>)
}

export default SpotifyApi