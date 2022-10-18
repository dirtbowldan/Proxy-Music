import Home from "./pages/home/Home";
import React, { useContext } from "react";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import List from "./pages/list/List";
import "./style/darkmode.scss";
import "./style/style.scss";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { userInputs } from "./formSource";
import Register from "./pages/register/register";
import {useDispatch} from 'react-redux'
import { getPosts } from './actions/posts';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/new" />;
  };

  

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="new" element={<New inputs={userInputs} />} />
            <Route path="register" element={<Register inputs={userInputs} />} />
            <Route index element={<Home currentUser={currentUser} />} />

            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
