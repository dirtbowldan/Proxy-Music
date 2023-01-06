import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <GoogleOAuthProvider clientId="16536111411-290pq3kakc2qehm3e844rtbuhifhg65v.apps.googleusercontent.com">
          <Provider store={store}>
            <App />
          </Provider>
        </GoogleOAuthProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
